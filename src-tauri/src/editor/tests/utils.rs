use std::fs;
use std::fs::File;
use std::{io::Result, path::Path};

use better_cursor::BetterRead;

pub const MOCK_QUEST_INFO_SOURCE: &str = "./mock/quest_sample-info.bin";
pub const MOCK_QUEST_SOURCE: &str = "./mock/quest_sample.bin";
pub const MOCK_QUEST: &str = "./src/editor/tests/temp/quest_sample.bin";
pub const MOCK_QUEST_INFO: &str = "./src/editor/tests/temp/quest_sample-info.bin";

pub fn get_file_hash(input: &str) -> Result<u32> {
    let input_path = Path::new(input);
    let mut file = File::open(input_path)?;
    let buffer = file.get_buffer()?;

    let hash = crc32fast::hash(&buffer);
    Ok(hash)
}

pub fn prepare_mock_files() {
    if let Some(parent_dir) = Path::new(MOCK_QUEST).parent() {
        fs::create_dir_all(parent_dir).unwrap();
    }

    fs::copy(MOCK_QUEST_SOURCE, MOCK_QUEST).unwrap();
}

pub fn prepare_mock_info_files() {
    if let Some(parent_dir) = Path::new(MOCK_QUEST_INFO).parent() {
        fs::create_dir_all(parent_dir).unwrap();
    }

    fs::copy(MOCK_QUEST_INFO_SOURCE, MOCK_QUEST_INFO).unwrap();
}
