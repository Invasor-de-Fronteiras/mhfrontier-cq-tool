use crate::{
    quest_file::QuestFile,
    save_json::save_quest_to_json,
    structs::{
        header::{MapInfo, QuestFileHeader},
        monsters::{LargeMonsterPointers, LargeMonsterSpawn},
        quest_type_flags::{
            ForcedEquipment, GenQuestProp, MainQuestProp, Objective, Quantity, QuestObjective,
            QuestTypeFlags, RewardsFocus, Variants,
        },
    },
};

#[test]
fn reader_test() {
    let quest_file = QuestFile::from_path("quest-tests/64554d1-musous.bin").unwrap();

    save_quest_to_json("output/64554d1-musous.json", &quest_file).unwrap();

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
        gen_quest_prop: GenQuestProp {
            big_monster_size_multi: 102,
            size_range: 3,
            mons_stat_table1: 13,
            main_rank_points: 530,
            kn: 15,
            sub_arank_points: 80,
            sub_brank_points: 80,
            monster_class_id: 1,
            skip1: [1, 1, 0, 0],
            little_mons_stat_table: 13,
            skip2: [0, 0, 1, 0, 0, 0, 57, 0, 3],
            quest_kn0: 1,
            skip3: [0; 7],
            quest_kn1: 2,
            quest_kn2: 3,
            quest_kn3: 56,
            quantity: Quantity {
                gathering_tables_qty: 102,
                unk0: 6,
                area1zones: 11,
                area2zones: 11,
                area3zones: 11,
                area4zones: 11,
            },
            unk3: 0,
            unk4: 0,
            unk5: 0,
        },
        quest_type_flags: QuestTypeFlags {
            main_quest_prop: MainQuestProp {
                unk0: 65,
                unk1: 0,
                quest_locale_flags: 10,
                unk2: 0,
                ranking_id: 6,
                unk3: 5,
                unk4: 19,
                rank_band0: 31,
                untat_id: 1, // enum quest_type_id N,ka,zy,su,HC,HS,Rea,G
                skip1: 0,
                quest_fee: 300,
                reward_main: 4400,
                max_death: 220,
                unk9: 5,
                unk10: 0,
                unk11: 0,
                reward_a: 1000,
                skip2: [0; 2],
                reward_b: 1000,
                hard_hunter_rank_req: 0,
                quest_time: 90000,
                quest_map_only_monitor: 6, // map_id
                quest_strings_ptr: 15680,
                unkk: 0,
                quest_id: 21085,
                objectives: QuestObjective {
                    objective1: Objective {
                        quest_objective: 1,
                        monster_id: 48,
                        unk: 0,
                        quantity: 1,
                    },
                    objective2: Objective {
                        quest_objective: 2,
                        monster_id: 15,
                        unk: 2,
                        quantity: 8,
                    },
                    objective3: Objective {
                        quest_objective: 0x4004,
                        monster_id: 48,
                        unk: 0,
                        quantity: 1,
                    },
                },
                unk6: 2,
                unk7: 0,
                join_rank_min: 31,
                join_rank_max: 0,
                post_rank_min: 31,
                post_rank_max: 0,
            },
            skip1: [0; 8],
            forced_equipement: ForcedEquipment {
                legs: 0,
                legs_attach1: 0, // +0x80 for some reason
                legs_attach2: 0, // +0x80 for some reason
                legs_attach3: 0, // +0x80 for some reason
                weapon: 0,
                weapon_attach1or_bitmask: 0,
                weapon_attach2: 0,
                weapon_attach3: 0,
                head: 0,
                head_attach1: 0, // +0x80 for some reason
                head_attach2: 0, // +0x80 for some reason
                head_attach3: 0, // +0x80 for some reason
                chest: 0,
                chest_attach1: 0, // +0x80 for some reason
                chest_attach2: 0, // +0x80 for some reason
                chest_attach3: 0, // +0x80 for some reason
                arms: 0,
                arms_attach1: 0, // +0x80 for some reason
                arms_attach2: 0, // +0x80 for some reason
                arms_attach3: 0, // +0x80 for some reason
                waist: 0,
                waist_attach1: 0, // +0x80 for some reason
                waist_attach2: 0, // +0x80 for some reason
                waist_attach3: 0, // +0x80 for some reason

                unk: 0,
            },
            variants: Variants {
                monster_variant0: 0,
                monster_variant1: 0,
                monster_variant2: 0,
                map_variant0: 0,
                required_item_type: 0,
                required_item_count: 0,
                quest_variant1: 0,
                quest_variant2: 0,
                quest_variant3: 0,
            },
            allowed_equipment_bitmask: 0, // FF7F for none
            // skip2: [0;2],
            rewards_focus: RewardsFocus {
                exp_type_maybe: 0,
                main_rp_grp: 530,
                skip1: [0; 2],
                sub_a_rp_grp: 80,
                skip2: [0; 2],
                sub_b_rp_grp: 80,
                skip3: [0; 2],
                item1: 532,
                item2: 528,
                item3: 473,
                skip4: [0; 3],
                monster_id: 48,
            },
            skip3: [0; 10],
            quest_clears_allowed: 0,
            quest_monster_icon: 0,
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
