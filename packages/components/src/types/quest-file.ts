
interface LargeMonsterPointers {
    unk_0: number,
    unk_1: number,
    large_monster_ids: number,
    large_monster_spawns: number,
    unk_2: number,
    unk_3: number,
    unk_4: number,
    unk_5: number,
}

interface LargeMonsterSpawn {
    monster_id: number,
    unk1: number,
    unk2: number,
    unk3: number,
    spawn_amount: number,
    spawn_stage: number,

    // skip 16 bytes
    unk4: number,
    unk5: number,
    unk6: number,
    unk7: number,

    unk8: number,
    x_position: number,
    y_position: number,
    z_position: number,
    unk9: number,
    unk10: number,
    unk11: number,
    unk12: number,
}

export interface QuestFileHeader {
    quest_type_ptr: number,
    loaded_stages_ptr: number,
    supply_box_ptr: number,
    reward_ptr: number,
    sub_supply_box_ptr: number,
    unk0: number,
    sub_supply_box_len: number,
    quest_area_ptr: number,
    large_monster_ptr: number,
    area_floats: number,
    unk_floats1: number,
    unk_ptr3: number,
    unk_ptr4: number,
    unk_ptr5: number,
    unk_ptr6: number,
    unk_ptr7: number,
    gathering_pointers: number,
    unk_ptr8: number,
    unk_ptr9: number,
}

export interface QuestFile {
    header: QuestFileHeader,
    large_monster_pointers: LargeMonsterPointers,
    large_monster_ids: number[],
    large_monster_spawns: LargeMonsterSpawn[], // pub monster_spawn: LargeMonsterSpawn,
}
