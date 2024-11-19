use serde_json::Value;
use std::sync::Mutex;

use tauri::{ipc::Channel, Error, State};

mod jam_unit;
use jam_unit::JamUnit;

struct UnitState(Mutex<JamUnit>);

#[tauri::command]
fn start(
    unit_state: State<'_, UnitState>,
    api_url: String,
) -> Result<Value, Error> {
    let mut unit = unit_state.0.lock().unwrap();
    unit.start(api_url)
}


#[tauri::command]
fn start_audio(
    unit_state: State<'_, UnitState>, 
    on_event: Channel<Value>,
    use_alsa: bool,
    in_dev: String,
    out_dev: String
) -> Result<(), Error> {
    let mut unit = unit_state.0.lock().unwrap();
    unit.start_audio(on_event, use_alsa, in_dev, out_dev)?;
    Ok(())
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
        .invoke_handler(tauri::generate_handler![start, start_audio, send_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
