use better_cursor::{BetterRead, BetterWrite};
use better_cursor::{StructRead, StructWrite};
use serde::{Deserialize, Serialize};
use std::io::Result;

#[derive(StructRead, StructWrite, Serialize, Deserialize, Debug, PartialEq)]
pub struct LoadedStage {
    pub stage_id: u32,
    pub unk1: u32,
    pub unk2: u32,
    pub unk3: u32,
}

pub type LoadedStages = Vec<LoadedStage>;
