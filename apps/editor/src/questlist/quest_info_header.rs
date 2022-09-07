use serde_derive::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestInfoHeader {
    pub unk0: [u8; 3],
    // This byte is the number of players that can join the quest
    // values above 04 will make the quest into PVP, more testing needed.
    pub max_players: u8,
    // This is the Quest Category, 2 bytes, the quest will be available in this category.
    pub quest_category: u8, // QuestCategory
    pub unk1: [u8; 6],
    pub mark: u8, // QuestMark
    pub unk2: u8,
    pub unk3: u8,
    pub length_msb: u8, // total bytes from quest_info (Most significant bit)
    pub length_lsb: u8, // total bytes from quest_info (Least significant bit)
}

impl QuestInfoHeader {
    pub fn new() -> QuestInfoHeader {
        QuestInfoHeader {
            unk0: [0, 0, 15],
            max_players: 4,
            quest_category: 0x1C,
            unk1: [1, 0, 0, 0, 0, 0],
            mark: 0,
            unk2: 0,
            unk3: 0,
            length_msb: 0,
            length_lsb: 0,
        }
    }

    pub fn get_length(&self) -> u16 {
        u16::from_le_bytes([self.length_lsb, self.length_msb])
    }

    pub fn set_length(&mut self, value: u16) {
        let buf = value.to_le_bytes();
        self.length_lsb = buf[0];
        self.length_msb = buf[1];
    }
}

pub fn quest_header() -> [u8; 16] {
    return [
        00, 00, 15, 04, 18, 01, 00, 00, 00, 00, 00, 00, 00, 00, 255, 255,
    ];
}
