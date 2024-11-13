use serde_json::Value;
use std::sync::Mutex;

use tauri::{ipc::Channel, Error, State};

mod jam_unit;
use jam_unit::{JamUnit, UnitMessage};

struct UnitState(Mutex<JamUnit>);

#[tauri::command]
fn start(unit_state: State<'_, UnitState>, on_event: Channel<UnitMessage>) -> Result<Value, Error> {
    let mut unit = unit_state.0.lock().unwrap();
    unit.start(on_event)
}

#[tauri::command]
fn send_command(unit_state: State<'_, UnitState>, msg: Value) -> Result<(), Error> {
    let mut unit = unit_state.0.lock().unwrap();
    unit.send_command(msg)?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .manage(UnitState(Mutex::new(JamUnit::new())))
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![start, send_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
