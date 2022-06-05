#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri;
use serde::{Serialize, Deserialize};
use editor::quest_file::QuestFile;
use std::io::Result;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
struct SaveQuestPayload {
  filepath: String,
  quest: QuestFile
}

fn wrap_result(message: String, has_error: bool) -> String {
    if has_error {
      return format!("{{ \"error\": \"{}\" }}", message);
    }

    message
}

#[tauri::command]
fn save_quest_file(event: String) -> String {
  let result = || -> Result<String> {
    let mut payload = serde_json::from_str::<SaveQuestPayload>(&event)?;
    QuestFile::save_to(&payload.filepath, &mut payload.quest)?;

    Ok(String::from("{ \"status\": \"Success\" }"))
  };
  
  // "./output/21085d0.json"
  match result() {
    Ok(response) => response,
    Err(error) => wrap_result(error.to_string(), true)
  }
}

#[tauri::command]
fn read_quest_file(event: String) -> String {
  let result = QuestFile::from_path(&event);
  // "./output/21085d0.json"
  match result {
    Ok(quest) => {
      // if let Err(result) = save_json::save_quest_to_json(output, &quest) {
      //     println!("failed to save json!");
      match serde_json::to_string_pretty(&quest) {
        Ok(text) => text,
        Err(error) => wrap_result(error.to_string(), true)
      }
    },
    Err(error) => wrap_result(error.to_string(), true)
  }
}

fn main() {

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![read_quest_file, save_quest_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// "distDirTest": "../../target/debug/build"
