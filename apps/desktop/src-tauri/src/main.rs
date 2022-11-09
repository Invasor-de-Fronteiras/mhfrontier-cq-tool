#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod utils;
mod quest;
mod questlist;
mod re_frontier;

use tauri;
use quest::{ read_quest_file, save_quest_file };
use questlist::{ read_all_questlist, read_all_questlist_old, read_questinfo, save_all_questlists };
use re_frontier::re_frontier;

#[tokio::main]
async fn main() {

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      read_quest_file,
      save_quest_file,
      read_all_questlist,
      read_all_questlist_old,
      read_questinfo,
      save_all_questlists,
      re_frontier
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}