use serde::{Deserialize, Serialize};

// O Rust não armazena os attributos na mesma ordem que foi declarado na memória
// O compilador decide a ordem para otimizações
// É necessário adicionar o repr(C) para o rust utilizar a mesma ordem
#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestFileHeader {
    pub quest_type_ptr: u32,
    pub loaded_stages_ptr: u32,
    pub supply_box_ptr: u32,
    pub reward_ptr: u32,
    pub sub_supply_box_ptr: u16,
    pub unk0: u8,
    pub sub_supply_box_len: u8,
    pub quest_area_ptr: u32,
    pub large_monster_ptr: u32,
    pub area_change: u32,
    pub area_maping: u32,
    pub map_info: u32,
    pub gather_points: u32,
    pub base_camp_inf: u32,
    pub some_strings: u32,
    pub fixed_cords1: u32,
    pub gathering_pointers: u32,
    pub fixed_cords2: u32,
    pub fixed_inf: u32,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct MapInfo {
    pub map_id: u32,
    pub return_bc_id: u32,
}
