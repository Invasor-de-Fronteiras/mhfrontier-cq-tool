extern crate serde_json;

use crate::quest_file::QuestFile;

pub fn save_quest_to_json(filename: &str, quest: &QuestFile) {
    // Save the JSON structure into the other file.
    std::fs::write(filename, serde_json::to_string_pretty(&quest).unwrap()).unwrap();
}
