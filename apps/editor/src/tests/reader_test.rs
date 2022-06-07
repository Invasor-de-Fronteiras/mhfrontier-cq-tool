use crate::{
    quest_file::QuestFile,
    save_json::save_quest_to_json,
    structs::{
        header::{MapInfo, QuestFileHeader},
        monsters::{LargeMonsterPointers, LargeMonsterSpawn},
    },
};

#[test]
fn reader_test() {
    let quest_file = QuestFile::from_path("quest-tests/21085d0.bin").unwrap();

    save_quest_to_json("output/21085d0.json", &quest_file).unwrap();

    let expected = QuestFile {
        header: QuestFileHeader {
            quest_type_ptr: 192,
            loaded_stages_ptr: 512,
            supply_box_ptr: 15360,
            reward_ptr: 15200,
            sub_supply_box_ptr: 15552,
            unk0: 0,
            sub_supply_box_len: 128,
            quest_area_ptr: 816,
            large_monster_ptr: 5920,
            area_change: 8576,
            area_maping: 8224,
            map_info: 11248,
            gather_points: 6816,
            base_camp_inf: 6368,
            some_strings: 15524,
            fixed_cords1: 576,
            gathering_pointers: 12448,
            fixed_cords2: 12256,
            fixed_inf: 11264,
        },
        map_info: MapInfo {
            map_id: 6,
            return_bc_id: 110,
        },
        large_monster_pointers: LargeMonsterPointers {
            large_monster_ids: 5952,
            large_monster_spawns: 5984,
            unk_0: 1,
            unk_1: 0,
            unk_2: 0,
            unk_3: 0,
            unk_4: 0,
            unk_5: 0,
        },
        large_monster_ids: vec![48, 0, 0, 0, 0],
        large_monster_spawns: vec![
            LargeMonsterSpawn {
                monster_id: 48,
                spawn_amount: 1,
                spawn_stage: 120,
                unk4: 0,
                unk5: 0,
                unk6: 0,
                unk7: 0,
                unk8: 65202,
                x_position: 8651.0,
                y_position: 3.0,
                z_position: 7795.0,
                unk9: 0,
                unk10: 0,
                unk11: 0,
                unk12: 0,
            },
            LargeMonsterSpawn {
                monster_id: 65535,
                spawn_amount: 0,
                spawn_stage: 0,
                unk4: 0,
                unk5: 0,
                unk6: 0,
                unk7: 0,
                unk8: 0,
                x_position: 0.0,
                y_position: 0.0,
                z_position: 0.0,
                unk9: 0,
                unk10: 0,
                unk11: 0,
                unk12: 0,
            },
            LargeMonsterSpawn {
                monster_id: 65535,
                spawn_amount: 0,
                spawn_stage: 0,
                unk4: 0,
                unk5: 0,
                unk6: 0,
                unk7: 0,
                unk8: 0,
                x_position: 0.0,
                y_position: 0.0,
                z_position: 0.0,
                unk9: 0,
                unk10: 0,
                unk11: 0,
                unk12: 0,
            },
            LargeMonsterSpawn {
                monster_id: 65535,
                spawn_amount: 0,
                spawn_stage: 0,
                unk4: 0,
                unk5: 0,
                unk6: 0,
                unk7: 0,
                unk8: 0,
                x_position: 0.0,
                y_position: 0.0,
                z_position: 0.0,
                unk9: 0,
                unk10: 0,
                unk11: 0,
                unk12: 0,
            },
            LargeMonsterSpawn {
                monster_id: 65535,
                spawn_amount: 0,
                spawn_stage: 0,
                unk4: 0,
                unk5: 0,
                unk6: 0,
                unk7: 0,
                unk8: 0,
                x_position: 0.0,
                y_position: 0.0,
                z_position: 0.0,
                unk9: 0,
                unk10: 0,
                unk11: 0,
                unk12: 0,
            },
        ],
    };

    assert_eq!(quest_file.header, expected.header);
    assert_eq!(
        quest_file.large_monster_pointers,
        expected.large_monster_pointers
    );

    assert_eq!(quest_file.large_monster_ids, expected.large_monster_ids);

    for (i, large_monster_spawn) in quest_file.large_monster_spawns.iter().enumerate() {
        assert_eq!(large_monster_spawn, &expected.large_monster_spawns[i]);
    }
}
