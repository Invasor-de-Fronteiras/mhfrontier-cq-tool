use serde_derive::{Deserialize, Serialize};

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
    pub area_floats: u32,
    pub unk_floats1: u32,
    pub unk_ptr3: u32,
    pub unk_ptr4: u32,
    pub unk_ptr5: u32,
    pub unk_ptr6: u32,
    pub unk_ptr7: u32,
    pub gathering_pointers: u32,
    pub unk_ptr8: u32,
    pub unk_ptr9: u32,
}
