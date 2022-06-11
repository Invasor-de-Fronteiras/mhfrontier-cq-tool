use serde_derive::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct RewardItem {
    pub rate: u16,
    pub item: u16,
    pub quantity: u16
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct RewardTableHeader {
    pub table_id: u8,
    pub unk_0: u8,
    pub unk_1: u16,
    pub table_offset: u32
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct RewardTable {
    pub table_header: RewardTableHeader,
    pub items: Vec<RewardItem>
}