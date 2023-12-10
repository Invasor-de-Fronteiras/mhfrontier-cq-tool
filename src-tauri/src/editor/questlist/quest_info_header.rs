use serde::{Deserialize, Serialize};

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

    pub fn from_old(quest_info_header: QuestInfoHeaderOld) -> QuestInfoHeader {
        QuestInfoHeader {
            unk0: [
                quest_info_header.unk0[0],
                quest_info_header.unk0[1],
                quest_info_header.unk0[2],
            ],
            max_players: quest_info_header.max_players,
            quest_category: quest_info_header.quest_category,
            unk1: quest_info_header.unk1,
            mark: quest_info_header.mark,
            unk2: quest_info_header.unk2,
            unk3: quest_info_header.unk3,
            length_msb: quest_info_header.length_msb,
            length_lsb: quest_info_header.length_lsb,
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

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestInfoHeaderOld {
    pub unk0: [u8; 3],
    pub max_players: u8,
    pub quest_category: u8,
    pub unk1: [u8; 6],
    pub mark: u8,
    pub unk2: u8,
    pub unk3: u8,
    pub length_msb: u8,
    pub length_lsb: u8,
}
