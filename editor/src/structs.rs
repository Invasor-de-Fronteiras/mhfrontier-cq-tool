// typedef struct {
//     SetBackColor( 0xFF00CCFF );
//     unsigned long  questTypeFlagsPtr;
//     unsigned long  loadedStagesPtr;
//     unsigned long  supplyBoxPtr;
//     unsigned long  rewardPtr;
//     unsigned short  subSupplyBoxPtr;
//     unsigned byte  unk0;
//     unsigned byte  subSupplyBoxLen;
//     unsigned long  questAreaPtr;
//     unsigned long  largeMonsterPtr;
//     unsigned long  areaFloats;
//     unsigned long  unkFloats1;
//     unsigned long  unkPtr3;
//     unsigned long  unkPtr4;
//     unsigned long  unkPtr5;
//     unsigned long  unkPtr6;
//     unsigned long  unkPtr7;
//     unsigned long  gatheringPointers;
//     unsigned long  unkPtr8;
//     unsigned long  unkPtr9;
// } QuestFileHeader;

use crate::monsters::{LargeMonsterPointers, LargeMonsterSpawn};

#[derive(Debug)]
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

#[derive(Debug)]
pub struct QuestFile {
    pub header: QuestFileHeader,
    pub monster_pointers: LargeMonsterPointers,
    pub monster_spawn: LargeMonsterSpawn,
}
