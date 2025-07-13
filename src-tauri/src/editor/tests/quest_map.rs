use crate::editor::quest::header::MapInfo;
use crate::editor::quest::map_zones::{
    MapSection, MapSectionHeader, MapZone, MapZones, SmallMonsterSpawn,
};
use crate::editor::quest::quest_file::QuestFile;
use crate::editor::tests::utils::{prepare_mock_files, MOCK_QUEST};

#[test]
pub fn load_map() {
    prepare_mock_files();
    let quest = QuestFile::from_path(MOCK_QUEST).unwrap();

    let map_info: MapInfo = MapInfo {
        map_id: 64,
        return_bc_id: 363,
    };

    assert_eq!(quest.map_info, map_info);

    let map_zone_ptrs = vec![11334, 11334, 11334];

    assert_eq!(quest.map_zones.map_zone_ptrs, map_zone_ptrs);

    let small_monster_spawn_first = SmallMonsterSpawn {
        monster_id: 124,
        size: 0,
        skip0: [0u8; 14],
        skip1: [0u8; 16],
        spawn_amount: 1,
        spawn_toggle: 0,
        unk0: 0,
        unk1: 65536,
        unk2: 54517,
        x_position: 6998.0,
        y_position: 0.0,
        z_position: 9652.0,
    };

    assert_eq!(
        quest.map_zones.map_zones[0].map_sections[0].small_monster_spawns[0],
        small_monster_spawn_first
    );

    let small_monster_spawn_last = SmallMonsterSpawn {
        monster_id: 124,
        size: 0,
        skip0: [0u8; 14],
        skip1: [0u8; 16],
        spawn_amount: 1,
        spawn_toggle: 0,
        unk0: 0,
        unk1: 65536,
        unk2: 28746,
        x_position: 12168.0,
        y_position: 0.0,
        z_position: 7693.0,
    };

    assert_eq!(
        quest.map_zones.map_zones[0].map_sections[4].small_monster_spawns[2],
        small_monster_spawn_last
    );

    let map_sections = vec![
        MapSection {
            header: MapSectionHeader {
                loaded_stage: 363,
                spawn_stats_ptr: 11446,
                spawn_types_ptr: 11430,
                unk0: 0,
            },
            monster_ids: quest.map_zones.map_zones[0].map_sections[0]
                .monster_ids
                .clone(),
            small_monster_spawns: quest.map_zones.map_zones[0].map_sections[0]
                .small_monster_spawns
                .clone(),
        },
        MapSection {
            header: MapSectionHeader {
                loaded_stage: 365,
                spawn_stats_ptr: 11944,
                spawn_types_ptr: 11928,
                unk0: 0,
            },
            monster_ids: quest.map_zones.map_zones[0].map_sections[1]
                .monster_ids
                .clone(),
            small_monster_spawns: quest.map_zones.map_zones[0].map_sections[1]
                .small_monster_spawns
                .clone(),
        },
        MapSection {
            header: MapSectionHeader {
                loaded_stage: 367,
                spawn_stats_ptr: 12442,
                spawn_types_ptr: 12426,
                unk0: 0,
            },
            monster_ids: quest.map_zones.map_zones[0].map_sections[2]
                .monster_ids
                .clone(),
            small_monster_spawns: quest.map_zones.map_zones[0].map_sections[2]
                .small_monster_spawns
                .clone(),
        },
        MapSection {
            header: MapSectionHeader {
                loaded_stage: 369,
                spawn_stats_ptr: 12940,
                spawn_types_ptr: 12924,
                unk0: 0,
            },
            monster_ids: quest.map_zones.map_zones[0].map_sections[3]
                .monster_ids
                .clone(),
            small_monster_spawns: quest.map_zones.map_zones[0].map_sections[3]
                .small_monster_spawns
                .clone(),
        },
        MapSection {
            header: MapSectionHeader {
                loaded_stage: 371,
                spawn_stats_ptr: 13550,
                spawn_types_ptr: 13542,
                unk0: 0,
            },
            monster_ids: quest.map_zones.map_zones[0].map_sections[4]
                .monster_ids
                .clone(),
            small_monster_spawns: quest.map_zones.map_zones[0].map_sections[4]
                .small_monster_spawns
                .clone(),
        },
    ];

    let map_zones = vec![MapZone {
        map_sections,
        map_zone_ptr: 11334,
        unk0: 0,
        unk1: 0,
        unk2: 0,
        unk3: 0,
    }];

    let map_zones = MapZones {
        map_zone_ptrs,
        map_zones,
    };

    assert_eq!(quest.map_zones, map_zones);
}
