use rtjam_rust::pedals::pedal_board::PedalBoard;
use tauri::Error;


pub struct JamUnit {
    board: PedalBoard,
}

impl JamUnit {
    pub fn new() -> JamUnit {
        JamUnit {
            board: PedalBoard::new(0)
        }
    }
    pub fn start(&mut self) -> Result<(), Error> {
        println!("start me up!");
        println!("{}", serde_json::to_string_pretty(&self.board.as_json(34)).unwrap());
        Ok(())
    }
}

