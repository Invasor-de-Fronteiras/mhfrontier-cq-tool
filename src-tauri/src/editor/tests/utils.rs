use std::{io::Result, path::Path};
use std::fs::File;
use std::fs;

use better_cursor::BetterRead;

pub const MOCK_QUEST_SOURCE: &str = "./mock/quest_sample.bin";
pub const MOCK_QUEST: &str = "./src/editor/tests/temp/quest_sample.bin";

pub fn get_file_hash(input: &str) -> Result<u32> {
    let input_path = Path::new(input);
    let mut file = File::open(input_path)?;
    let buffer = file.get_buffer()?;

    let hash = crc32fast::hash(&buffer);
    Ok(hash)
}

pub fn prepare_mock_files() {
    fs::copy(MOCK_QUEST_SOURCE, MOCK_QUEST).unwrap();
}