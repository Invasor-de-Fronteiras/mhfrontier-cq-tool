use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct LoadedStage {
    pub stage_id: u32,
    pub unk1: u32,
    pub unk2: u32,
    pub unk3: u32,
}

pub type LoadedStages = Vec<LoadedStage>;
