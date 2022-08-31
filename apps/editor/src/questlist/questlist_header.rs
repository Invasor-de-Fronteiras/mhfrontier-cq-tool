use serde_derive::{Deserialize, Serialize};

pub const QUEST_END: [u8; 33] = [
    26, 131, 110, 131, 147, 131, 94, 129, 91, 143, 148, 140, 78, 130, 214, 138, 180, 142, 211, 130,
    240, 141, 158, 130, 223, 130, 196, 29, 93, 48, 210, 0, 0,
];

pub fn file_header() -> [u8; 8] {
    return [00, 42, 13, 125, 143, 204, 00, 00];
}

pub fn quest_end() -> [u8; 25] {
    return [
        18, 131, 89, 137, 91, 131, 58, 88, 182, 142, 89, 130, 204, 131, 88, 131, 88, 131, 129, 44,
        151, 05, 65, 00, 00,
    ];
}

pub fn quest_end_last() -> [u8; 1] {
    return [00];
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestlistHeader {
    pub unk0: u8,
    pub quest_count: u8,
    pub unk1: u16,
    pub unk2: u16,
    pub unk3: u16,
}
