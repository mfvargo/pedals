use std::sync::mpsc;
use std::thread::{self, sleep};
use std::time::Duration;

use rtjam_rust::common::jam_nation_api::JamNationApi;
use rtjam_rust::pedals::pedal_board::PedalBoard;
use rtjam_rust::sound::param_message::{JamParam, ParamMessage};
use rtjam_rust::sound::{alsa_thread, jack_thread};
use rtjam_rust::utils::get_my_mac_address;
use rtjam_rust::JamEngine;
use serde_json::{json, Value};
use tauri::{ipc::Channel, Error};
use thread_priority::{ThreadBuilder, ThreadPriority};

pub struct JamUnit {
    token: String,
    pinging: bool,
    cmd_tx: Option<mpsc::Sender<ParamMessage>>,
    pedal_tx: Option<mpsc::Sender<PedalBoard>>,
    audio_on: bool,
}

const GIT_HASH: &str = "What is my hash?";

impl JamUnit {
    pub fn new() -> JamUnit {
        JamUnit {
            token: String::from(""),
            pinging: false,
            cmd_tx: None,
            pedal_tx: None,
            audio_on: false,
        }
    }
    pub fn start(&mut self, 
        api_url: String,
    ) -> Result<Value, Error> {
        println!("start me up!  {}", api_url);

        if self.pinging {
            println!("preventing double start");
            return Ok(json!(self.token));
        }
        let url = api_url + "/api/1/";
        let mac_address = get_my_mac_address().unwrap();

        // Create an api endpoint and register this jamUnit
        let mut api = JamNationApi::new(url.as_str(), mac_address.as_str(), GIT_HASH);
        let _register = api.jam_unit_register();

        self.token = String::from(api.get_token());
        println!("jam_unit_registered: {}", self.token);

        if !self.pinging && api.has_token() {
            self.pinging = true;
            let _ping_handle = thread::spawn(move || {
                let _res = Self::jam_unit_ping_thread(api);
            });
        }

        Ok(json!(self.token))
    }

    // Use this to start the audio thread
    pub fn start_audio(&mut self,
        ev: Channel<Value>, 
        use_alsa: bool,
        in_dev: String,
        out_dev: String
    ) -> Result<(), Error> {

        if self.audio_on {
            return Ok(());
        }

        // This is the channel the audio engine will use to send us status data
        let (status_data_tx, status_data_rx): (
            mpsc::Sender<serde_json::Value>,
            mpsc::Receiver<serde_json::Value>,
        ) = mpsc::channel();

        // This is the channel we will use to send commands to the jack engine
        let (command_tx, command_rx): (mpsc::Sender<ParamMessage>, mpsc::Receiver<ParamMessage>) =
            mpsc::channel();
        // Save the sender end in the jamUnit
        self.cmd_tx = Some(command_tx);

        // This is the channel we will send manufactured pedal boards to
        let (pedal_tx, pedal_rx): (mpsc::Sender<PedalBoard>, mpsc::Receiver<PedalBoard>) =
            mpsc::channel();
        // Save the sender end in the jamUnit
        self.pedal_tx = Some(pedal_tx);

        let token_copy = self.token.clone();

        match JamEngine::new(
            None,
            status_data_tx,
            command_rx,
            pedal_rx,
            &token_copy,
            GIT_HASH,
            false,
        ) {
            Ok(engine) => {
                // Now we have the engine, jack_thread
                // let _jack_thread_handle = thread::spawn(move || {
                //     let _res = jack_thread::run(engine);
                // });
                if use_alsa {
                    let builder = ThreadBuilder::default()
                        .name("Real-Time Thread".to_string())
                        .priority(ThreadPriority::Max);

                    let _alsa_handle = builder.spawn(move |_result| {
                        match alsa_thread::run(engine, &in_dev, &out_dev) {
                            Ok(()) => {
                                println!("alsa ended with OK");
                            }
                            Err(e) => {
                                println!("alsa exited with error {}", e);
                            }
                        }
                    })?;
                } else {
                    let _jack_thread_handle = thread::spawn(move || {
                        let _res = jack_thread::run(engine);
                    });
                }
            }
            Err(e) => {
                dbg!(e);
            }
        }

        // Spawn the message forwarder
        let _fwd_handle = thread::spawn(move || {
            let _res = Self::status_msg_forwarder(ev, status_data_rx);
        });
        self.audio_on = true;
        Ok(())
    }

    // Use this to send messages to the jamEnging
    pub fn send_command(&mut self, cmd: Value) -> Result<(), Error> {
        // Convert message into a ParamMessage
        println!("cmd: {}", cmd);
        match ParamMessage::from_json(&cmd) {
            Ok(msg) => {
                match msg.param {
                    JamParam::LoadBoard => {
                        // construct a pedal board and send the constructed board to the engine
                        let idx = msg.ivalue_1 as usize;
                        if idx < 2 {
                            // Build a pedalboard and send it to the jack thread
                            let mut board = PedalBoard::new(idx);
                            board.load_from_json(&msg.svalue);
                            if let Some(pedal_tx) = &self.pedal_tx {
                                let _res = pedal_tx.send(board);
                            }
                        }
                    }
                    JamParam::StopAudio => {
                        // Pass the message to the Engine to have it kill its threads
                        if let Some(tx) = &self.cmd_tx {
                            let _r = tx.send(msg);
                        }
                        self.cmd_tx = None;
                        self.pedal_tx = None;
                        self.audio_on = false;
                    }
                    _ => {
                        // Default, send this command to the engine
                        if let Some(tx) = &self.cmd_tx {
                            let _r = tx.send(msg);
                        }
                    }
                }
            }
            Err(e) => {
                dbg!(e);
            }
        }
        Ok(())
    }

    fn jam_unit_ping_thread(mut api: JamNationApi) -> Result<(), Error> {
        loop {
            while api.has_token() == true {
                // While in this loop, we are going to ping every 10 seconds
                match api.jam_unit_ping() {
                    Ok(ping) => {
                        if ping["jamUnit"].is_null() {
                            // Error in the ping.  better re-register
                            api.forget_token();
                        } else {
                            // Successful ping.. Sleep for 10
                            sleep(Duration::new(10, 0));
                        }
                    }
                    Err(e) => {
                        api.forget_token();
                        dbg!(e);
                    }
                }
            }
            if !api.has_token() {
                // We need to register the server
                let _register = api.jam_unit_register();
            }
            // This is the timer between registration attempts
            sleep(Duration::new(2, 0));
        }
    }

    // This message needs to get formatted and stuff
    fn status_msg_forwarder(ev: Channel<Value>, msg: mpsc::Receiver<Value>) -> Result<(), Error> {
        // My job is to receive status messages from the jamEngine and convert them into events
        let mut looping = true;
        while looping {
            match msg.recv() {
                Ok(m) => {
                    // Got a status message
                    ev.send(m)?;
                }
                Err(e) => {
                    looping = false;
                    dbg!(e);
                }
            }
        }
        Ok(())
    }
}
