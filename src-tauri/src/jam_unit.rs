use std::thread::{self, sleep};
use std::time::Duration;

use rtjam_rust::pedals::pedal_board::PedalBoard;
use rtjam_rust::utils::get_my_mac_address;
use rtjam_rust::common::jam_nation_api::JamNationApi;
use rtjam_rust::sound::param_message::ParamMessage;
use serde::Serialize;
use serde_json::{json, Value};
use tauri::{ipc::Channel, Error};

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase", tag = "event", content = "data")]
pub enum UnitMessage<> {
    #[serde(rename_all = "camelCase")]
    Level {
      data: Value,
    },
    #[serde(rename_all = "camelCase")]
    Boards {
      data: Value,
    },
}

pub struct JamUnit {
    board: PedalBoard,
    token: String,
    pinging: bool,
    on_event: Option<Channel<UnitMessage>>,
}

impl JamUnit {
    pub fn new() -> JamUnit {
        JamUnit {
            board: PedalBoard::new(0),
            token: String::from(""),
            pinging: false,
            on_event: None,
        }
    }
    pub fn start(&mut self, ev: Channel<UnitMessage>) -> Result<Value, Error> {
        println!("start me up!");

        self.on_event = Some(ev);

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
        Ok(json!(self.token))
    }

    pub fn send_levels(&mut self) -> Result<(), Error> {
        match &self.on_event {
            Some(ev) => {
                ev.send(UnitMessage::Level { data: json!({}) })?;
                ev.send(UnitMessage::Boards { data: self.board.as_json(0) })?;
            }
            None => {
                println!("no event to sent message On");
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
    
}

