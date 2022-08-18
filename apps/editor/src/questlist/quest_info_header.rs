use serde_derive::{Serialize, Deserialize};


// 2 bytes
pub enum QuestCategory {
    Campaign = 0x0009,
    Series = 0x0118,
    Superior = 0x0134,
    GSuperior = 0x0135,
    GArmorWeapon = 0x0136,
    LRHREvent = 0x0112,
    GEvent = 0x011C,
    Zenith = 0x012B,
    HRExotic = 0x0126,
    GExotic = 0x0127,
    DivaDefense = 0x3C11,
    GreatSlaying = 0x0110,
}


pub enum QuestMark {
    None = 00,
    Recommended = 01,
    New = 02,
    Refine = 04,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestInfoHeader {
    pub unk0: [u8; 3],
    // This byte is the number of players that can join the quest
    // values above 04 will make the quest into PVP, more testing needed.
    pub max_players: u8,
    // This is the Quest Category, 2 bytes, the quest will be available in this category.
    pub quest_category: u16, // QuestCategory
    pub unk1: [u8; 5],
    pub mark: u8, // QuestMark
    pub unk2: u8,
    pub unk3: u8,
    pub lenght: u16, // total bytes from quest_info
}

impl QuestInfoHeader {

    pub fn new() -> QuestInfoHeader {
        QuestInfoHeader { 
            unk0: [00, 00, 15], 
            max_players: 4,
            quest_category: 0x0112,
            unk1: [0; 5],
            mark: 0,
            unk2: 0,
            unk3: 0,
            lenght: 0
        }
    }
}
pub fn quest_header() -> [u8; 16] {
    return [00, 00, 15, 04, 18, 01, 00, 00, 00, 00, 00, 00, 00, 00, 255, 255 ];
}