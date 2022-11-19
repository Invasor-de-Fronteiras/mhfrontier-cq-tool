use std::io::Result;

use editor::{quest::quest_file::QuestFile, questlist::quest_info::QuestInfo};
use serde::{Deserialize, Serialize};

use crate::utils::{wrap_json_result, wrap_result};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct SaveQuestPayload {
    filepath: String,
    quest: QuestFile,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct ExportQuestInfoPayload {
    filepath: String,
    quest_info: QuestInfo,
}

#[tauri::command]
pub fn save_quest_file(event: String) -> String {
    let result = || -> Result<String> {
        let mut payload = serde_json::from_str::<SaveQuestPayload>(&event)?;
        QuestFile::save_to(&payload.filepath, &mut payload.quest)?;

        Ok(String::from("{ \"status\": \"Success\" }"))
    };

    match result() {
        Ok(response) => response,
        Err(error) => wrap_result(error.to_string(), true),
    }
}

#[tauri::command]
pub fn read_quest_file(event: String) -> String {
    let result = QuestFile::from_path(&event);
    wrap_json_result(result)
}

#[tauri::command]
pub fn export_quest_info(event: String) -> String {
    let result = || -> Result<String> {
        let mut payload = serde_json::from_str::<ExportQuestInfoPayload>(&event)?;
        payload.quest_info.save_to(&payload.filepath)?;

        Ok(String::from("{ \"status\": \"Success\" }"))
    };

    match result() {
        Ok(response) => response,
        Err(error) => wrap_result(error.to_string(), true),
    }
}
