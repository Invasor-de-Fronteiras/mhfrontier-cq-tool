use std::vec;

use crate::editor::{
    quest::quest_file::QuestFile,
    quest::{
        header::{MapInfo, QuestFileHeader},
        map_zones::MapZones,
        monsters::{LargeMonsterPointers, LargeMonsterSpawn, LargeMonsters},
        quest_type_flags::{
            ForcedEquipment, GenQuestProp, MainQuestProp, Objective, Quantity, QuestObjective,
            QuestTypeFlags, RewardsFocus, Variants,
        },
    },
    save_json::save_quest_to_json,
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
                unk3: 19,
                course: 5,
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
                unk12: 0,
                unk13: 0,
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
                quest_variant4: 0,
                unk1: 0,
            },
            allowed_equipment_bitmask: 0, // FF7F for none
            // skip2: [0;2],
            rewards_focus: RewardsFocus {
                exp_type_maybe: 0,
                main_rp_grp: 530,
                sub_a_rp_grp: 80,
                sub_b_rp_grp: 80,
                item1: 532,
                item2: 528,
                item3: 473,
                skip4: [0; 3],
                monster_icon1: 48,
                monster_icon2: 0,
                monster_icon3: 0,
                monster_icon4: 0,
                monster_icon5: 0,
            },
            skip3: [0; 8],
            quest_clears_allowed: 0,
            quest_monster_icon: 0,
        },
        map_info: MapInfo {
            map_id: 6,
            return_bc_id: 110,
        },
        large_monsters: LargeMonsters {
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
            large_monster_spawns: vec![LargeMonsterSpawn {
                monster_id: 48,
                unk0: 0,
                unk1: 0,
                unk2: 0,
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
            }],
        },
        rewards: vec![],
        unk_data: vec![],
        loaded_stages: vec![],
        map_zones: MapZones {
            map_zone_ptrs: vec![],
            map_zones: vec![],
        },
        supply_items: vec![],
        strings: quest_file.strings,
    };

    assert_eq!(quest_file.header, expected.header, "Header");
    assert_eq!(
        quest_file.large_monsters.large_monster_pointers,
        expected.large_monsters.large_monster_pointers,
        "LargeMonsterPointers"
    );

    assert_eq!(
        quest_file.large_monsters.large_monster_ids, expected.large_monsters.large_monster_ids,
        "LargeMonsterIds"
    );

    assert_eq!(quest_file.supply_items.len(), 40);
}
