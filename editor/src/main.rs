pub mod reader;
pub mod structs;
pub mod quest_file;

use quest_file::QuestFile;

fn main() {
    let quest_file = QuestFile::from_path("./editor/21085d0.bin");

    println!("quest: {:?}", quest_file);
}

#[cfg(test)]
mod tests;
