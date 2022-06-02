#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri;
use editor::main_test;
use editor::quest_file::QuestFile;

#[tauri::command]
fn read_quest_file(event: String) -> Option<String> {
  let result = QuestFile::from_path(&event);
  // "./output/21085d0.json"
  match result {
    Ok(quest) => {
      // if let Err(result) = save_json::save_quest_to_json(output, &quest) {
      //     println!("failed to save json!");
      match serde_json::to_string_pretty(&quest) {
        Ok(text) => Some(text),
        Err(error) => Some(format!("{{ \"error\": \"E{}\" }}", error.to_string()))
      }
    },
    Err(error) => Some(format!("{{ \"error\": \"{}\" }}", error.to_string()))
  }
}

fn main() {

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![read_quest_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// "distDirTest": "../../target/debug/build"
