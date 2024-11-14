use std::sync::mpsc;
use std::thread::{self, sleep};
use std::time::Duration;

use rtjam_rust::common::jam_nation_api::JamNationApi;
use rtjam_rust::pedals::pedal_board::PedalBoard;
use rtjam_rust::sound::{ jack_thread, alsa_thread };
use rtjam_rust::sound::param_message::ParamMessage;
use rtjam_rust::utils::get_my_mac_address;
use rtjam_rust::JamEngine;
use serde_json::{json, Value};
use tauri::{ipc::Channel, Error};
use thread_priority::{ThreadBuilder, ThreadPriority};


pub struct JamUnit {
    board: PedalBoard,
    token: String,
    pinging: bool,
    cmd_tx: Option<mpsc::Sender<ParamMessage>>,
    pedal_tx: Option<mpsc::Sender<PedalBoard>>,
}

impl JamUnit {
    pub fn new() -> JamUnit {
        JamUnit {
            board: PedalBoard::new(0),
            token: String::from(""),
            pinging: false,
            cmd_tx: None,
            pedal_tx: None,
        }
    }
    pub fn start(&mut self, ev: Channel<Value>) -> Result<Value, Error> {
        println!("start me up!");

        if self.pinging {
            println!("preventing double start");
            return Ok(json!(self.token));
        }

        // Insert pedals in reverse order (it puts each on at the front)
        for pedal in ["Champ", "Sigma Reverb", "Delay", "Compressor"] {
            self.board.insert_pedal(pedal, 0);
        }
        let api_url = String::from("http://rtjam-nation.com/api/1/");
        let mac_address = get_my_mac_address().unwrap();
        let git_hash = "what is my hash";

        // Create an api endpoint and register this jamUnit
        let mut api = JamNationApi::new(api_url.as_str(), mac_address.as_str(), git_hash);
        let _register = api.jam_unit_register();

        self.token = String::from(api.get_token());

        if !self.pinging && api.has_token() {
            self.pinging = true;
            let _ping_handle = thread::spawn(move || {
                let _res = Self::jam_unit_ping_thread(api);
            });
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
            git_hash,
            false,
        ) {
            Ok(engine) => {
                // Now we have the engine, jack_thread
                // let _jack_thread_handle = thread::spawn(move || {
                //     let _res = jack_thread::run(engine);
                // });
                let builder = ThreadBuilder::default()
                    .name("Real-Time Thread".to_string())
                    .priority(ThreadPriority::Max);
        
                let _alsa_handle = builder.spawn(move |_result| {
                    match alsa_thread::run(engine, "plughw:CODEC", "plughw:CODEC") {
                        Ok(()) => {
                        println!("alsa ended with OK");
                        }
                        Err(e) => {
                            println!("alsa exited with error {}", e);
                        }
                    }
                })?;
            }
            Err(e) => {
                dbg!(e);
            }
        }

        // Spawn the message forwarder
        let _ping_handle = thread::spawn(move || {
            let _res = Self::status_msg_forwarder(ev, status_data_rx);
        });

        Ok(json!(self.token))
    }

    // Use this to send messages to the jamEnging
    pub fn send_command(&mut self, cmd: Value) -> Result<(), Error> {
        // Convert message into a ParamMessage
        println!("cmd: {}", cmd);
        match ParamMessage::from_json(&cmd) {
            Ok(p) => {
                if let Some(tx) = &self.cmd_tx {
                    let _r = tx.send(p);
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
    fn status_msg_forwarder(
        ev: Channel<Value>,
        msg: mpsc::Receiver<Value>,
    ) -> Result<(), Error> {
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
