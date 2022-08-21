use serde_derive::{Serialize, Deserialize};


// 2 bytes
pub enum QuestCategory {
    Campaign = 0x0009,
    GreatSlaying = 0x10,
    DivaDefense = 0x3C11,
    LRHREvent = 0x12,
    Series = 0x18,
    GEvent = 0x1C,
    HRExotic = 0x26,
    GExotic = 0x27,
    Zenith = 0x2B,
    Superior = 0x34,
    GSuperior = 0x35,
    GArmorWeapon = 0x36,
    // "Campaign(HR)": 0x09,
    // "Great Slaying": 0x10,
    // "Event(HR)": 0x12,
    // "Great Slaying": 0x16,
    // "Series": 0x18,
    // "Daily": 0x1A,
    // "Event(GSR)": 0x1C,
    // "Emergency(?)": 0x1F,
    // "Exotic": 0x26,
    // "Exotic(GSR★8)": 0x27,
    // "Great Slaying(GSR)": 0x28,
    // "Zenith": 0x2B,
    // "Diva defence": 0x2E,
    // "Keo(?)": 0x30,
    // "Great Slaying Support(GSR)": 0x32,
    // "Great Slaying Support(GSR)": 0x33,
    // "Superior": 0x34,
    // "Superior(GSR)": 0x35,
    // "Weapon/Armor Quest(GSR)": 0x36,
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
            unk0: [00, 00, 15], 
            max_players: 4,
            quest_category: 0x12,
            unk1: [0; 6],
            mark: 0,
            unk2: 0,
            unk3: 0,
            length_msb: 0,
            length_lsb: 0,
        }
    }

    pub fn get_length(&self) -> u16 {
        u16::from_le_bytes([self.length_msb, self.length_lsb])
    }

    pub fn set_length(&mut self, value: u16) {
        let buf = value.to_le_bytes();
        self.length_lsb = buf[0];
        self.length_msb = buf[1];
    }

}
pub fn quest_header() -> [u8; 16] {
    return [00, 00, 15, 04, 18, 01, 00, 00, 00, 00, 00, 00, 00, 00, 255, 255 ];
}