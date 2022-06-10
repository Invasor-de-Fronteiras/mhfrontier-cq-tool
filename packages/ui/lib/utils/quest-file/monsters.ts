export interface LargeMonsterPointers {
    unk_0: number;
    unk_1: number;
    large_monster_ids: number;
    large_monster_spawns: number;
    unk_2: number;
    unk_3: number;
    unk_4: number;
    unk_5: number;
}
  
export interface LargeMonsterSpawn {
    monster_id: number;
    spawn_amount: number;
    spawn_stage: number;
  
    // skip 16 bytes
    unk4: number;
    unk5: number;
    unk6: number;
    unk7: number;
  
    unk8: number;
    x_position: number;
    y_position: number;
    z_position: number;
    unk9: number;
    unk10: number;
    unk11: number;
    unk12: number;
}