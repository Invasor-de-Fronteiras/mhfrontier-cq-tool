use better_cursor::{BetterCursor, BetterRead, BetterWrite};
use better_cursor::{StructRead, StructWrite};
use serde::{Deserialize, Serialize};
use std::{io::Result, mem::size_of};

#[derive(StructRead, StructWrite, Serialize, Deserialize, Debug, PartialEq)]
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
        let mut reader = better_cursor::from_filepath(filename)?;
        QuestEndFlag::from_reader(&mut reader)
    }

    pub fn from_reader<T: BetterCursor>(reader: &mut T) -> Result<QuestEndFlag> {
        let end_ptr = reader.len()? - 1;
        let sign_size = size_of::<QuestEndFlag>() as u64;
        reader.seek_start(end_ptr - sign_size)?;
        reader.read_struct::<QuestEndFlag>()
    }

    pub fn is_valid(&self) -> bool {
        return self.sign[0] == 0x41
            && self.sign[1] == 0x52
            && self.sign[2] == 0x43
            && self.sign[3] == 0x41;
    }
}
