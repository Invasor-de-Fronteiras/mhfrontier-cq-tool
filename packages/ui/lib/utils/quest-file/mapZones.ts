export interface SmallMonsterSpawn {
    monster_id: number;
    unk0: number;
    spawn_toggle: number;
    spawn_amount: number;
    unk1: number;
    size: number;
    skip0: number[],
    unk2: number;
    x_position: number,
    y_position: number,
    z_position: number,
    skip1: number[]
}

export interface MapSectionHeader {
    loaded_stage: number; 
    unk0: number;
    spawn_types_ptr: number;
    spawn_stats_ptr: number
}

export interface MapSection {
    header: MapSectionHeader,
    monster_ids: number[],
    small_monster_spawns: SmallMonsterSpawn[]
}

export interface MapZone {
    map_zone_ptr: number,
    map_sections: MapSection[],
    unk0: number,
    unk1: number,
    unk2: number,
    unk3: number,
}

export interface MapZones {
    map_zone_ptrs: number[],
    map_zones: MapZone[]
}