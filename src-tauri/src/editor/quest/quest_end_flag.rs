use std::{
    io::{Read, Result},
    mem::size_of,
};

use serde::{Deserialize, Serialize};

use crate::editor::file::reader::FileReader;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestEndFlag {
    pub start_ptr: u32,
    pub sign: [u8; 4],
}

impl QuestEndFlag {
    pub fn new(start_ptr: u32) -> QuestEndFlag {
        QuestEndFlag {
            start_ptr,
            sign: [0x41, 0x52, 0x43, 0x41],
        }
    }

    pub fn from_path(filename: &str) -> Result<QuestEndFlag> {
        let mut reader = FileReader::from_filename(filename)?;
        QuestEndFlag::from_reader(&mut reader)
    }

    pub fn from_reader(reader: &mut FileReader) -> Result<QuestEndFlag> {
        let mut buffer = Vec::<u8>::new();
        reader.reader.read_to_end(&mut buffer)?;
        let end_ptr = buffer.len() - 1;
        let sign_size = size_of::<QuestEndFlag>();
        reader.seek_start((end_ptr - sign_size) as u64)?;
        reader.read_struct::<QuestEndFlag>()
    }

    pub fn is_valid(&self) -> bool {
        return self.sign[0] == 0x41
            && self.sign[1] == 0x52
            && self.sign[2] == 0x43
            && self.sign[3] == 0x41;
    }
}
