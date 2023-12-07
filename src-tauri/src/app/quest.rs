use crate::editor::{quest::quest_file::QuestFile, questlist::quest_info::QuestInfo};
use serde::{Deserialize, Serialize};

use super::utils::EventResponse;

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
    let event_payload = serde_json::from_str::<SaveQuestPayload>(&event);
    match event_payload {
        Ok(mut payload) => {
            let result = QuestFile::save_to(&payload.filepath, &mut payload.quest);

            EventResponse::from_result(result).to_string()
        },
        Err(error) => EventResponse::payload_error(error.to_string()).to_string()
    }
}

#[tauri::command]
pub fn read_quest_file(event: String) -> String {
    let result = QuestFile::from_path(&event);
    EventResponse::from_result_data(result).to_string()
}

#[tauri::command]
pub fn export_quest_info(event: String) -> String {
    let event_payload = serde_json::from_str::<ExportQuestInfoPayload>(&event);

    match event_payload {
        Ok(mut payload) => {
            let result =  payload.quest_info.save_to(&payload.filepath);

            EventResponse::from_result(result).to_string()
        },
        Err(error) => EventResponse::payload_error(error.to_string()).to_string()
    }
}
