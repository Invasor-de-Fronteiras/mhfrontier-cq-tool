use serde_derive::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct SupplyItem {
    pub item: u16,
    pub quantity: u16,
}
