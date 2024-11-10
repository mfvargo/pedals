
use std::sync::Mutex;
use tauri::{Error, State};
mod jam_unit;
use jam_unit::JamUnit;

struct UnitState(Mutex<JamUnit>);

#[tauri::command]
fn start(unit_state: State<'_, UnitState>) -> Result<(), Error> {
    let mut unit = unit_state.0.lock().unwrap();
    unit.start()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(UnitState(Mutex::new(JamUnit::new())))
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![start])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
