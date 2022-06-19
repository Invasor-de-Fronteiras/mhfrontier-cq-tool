use crate::{
    offsets::MAIN_QUEST_PROP_PRT,
    reader::FileReader,
    structs::quest_type_flags::{
        ForcedEquipment, MainQuestProp, Objective, QuestObjective, QuestTypeFlags, RewardsFocus,
        Variants,
    },
};

#[test]
fn quest_type_flags() {
    let mut reader = FileReader::from_filename("quest-tests/21085d0.bin").unwrap();

    let expected = QuestTypeFlags {
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
            quest_variant4: 0,
            unk1: 0,
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
    };

    reader.seek_start(MAIN_QUEST_PROP_PRT as u64).unwrap();
    let gen_quest_prop = reader.read_struct::<QuestTypeFlags>().unwrap();

    assert_eq!(gen_quest_prop, expected);
}
