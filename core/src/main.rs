pub mod quest_file;
pub mod reader;
pub mod save_json;
pub mod structs;

use quest_file::QuestFile;

fn main() {
    let quest_file = QuestFile::from_path("./editor/21085d0.bin");
    save_json::save_quest_to_json("./output/21085d0.json", &quest_file);
}

#[cfg(test)]
mod tests;
