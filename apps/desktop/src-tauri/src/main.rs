#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod utils;

use std::process::Command;
use tauri;
use serde::{Serialize, Deserialize};
use editor::{quest::quest_file::QuestFile, questlist::quest_info::QuestInfo};
use editor::questlist::questlist_file::QuestlistFile;
use std::io::Result;
use utils::{ wrap_json_result, wrap_result };

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct SaveQuestPayload {
  filepath: String,
  quest: QuestFile
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct SaveQuestlistPayload {
  folder: String,
  questlists: Vec<QuestlistFile>
}

#[tauri::command]
fn save_quest_file(event: String) -> String {
  let result = || -> Result<String> {
    let mut payload = serde_json::from_str::<SaveQuestPayload>(&event)?;
    QuestFile::save_to(&payload.filepath, &mut payload.quest)?;

    Ok(String::from("{ \"status\": \"Success\" }"))
  };
  
  match result() {
    Ok(response) => response,
    Err(error) => wrap_result(error.to_string(), true)
  }
}

#[tauri::command]
fn read_quest_file(event: String) -> String {
  let result = QuestFile::from_path(&event);
  wrap_json_result(result)
}

#[tauri::command]
fn read_all_questlist(event: String) -> String {
  let result = QuestlistFile::read_all_questlist(&event);
  wrap_json_result(result)
}

#[tauri::command]
fn read_questinfo(event: String) -> String {
  let result = QuestInfo::from_questfile(&event);
  wrap_json_result(result)
}

#[tauri::command]
fn save_all_questlists(event: String) -> String {
  let result = || -> Result<String> {
    let mut payload = serde_json::from_str::<SaveQuestlistPayload>(&event)?;
    QuestlistFile::save_all_questlist(&payload.folder, &mut payload.questlists)?;

    Ok(String::from("{ \"status\": \"Success\" }"))
  };
  
  match result() {
    Ok(response) => response,
    Err(error) => wrap_result(error.to_string(), true)
  }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct ReFrontierPayload {
  filepath: String,
  re_frontier_path: String
}

#[tauri::command]
fn re_frontier(event: String) -> String {
  let result = || -> Result<String> {
    let mut payload = serde_json::from_str::<ReFrontierPayload>(&event)?;

    let is_windows = cfg!(target_os = "windows");

    if !is_windows {
      return Ok(String::from("{ \"message\": \"This feature only works on Windows\" }"))
    }

    let output = Command::new(payload.re_frontier_path)
      .args([payload.filepath])
      .output()?;

    let message = String::from_utf8(output.stdout).unwrap_or(String::from("Output invalid"));
    let result = serde_json::json!({
      "message": message
    });
    Ok(result.to_string())
  };
  
  match result() {
    Ok(response) => response,
    Err(error) => wrap_result(error.to_string(), true)
  }
}

fn main() {

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      read_quest_file,
      save_quest_file,
      read_all_questlist,
      read_questinfo,
      save_all_questlists,
      re_frontier
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

