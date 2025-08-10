use crate::editor::quest::quest_file::QuestFile;
use crate::editor::quest::quest_type_flags::{
    ForcedEquipment, MainQuestProp, Objective, QuestObjective, QuestTypeFlags, RewardsFocus,
    Variants,
};
use crate::editor::tests::utils::{prepare_mock_files, MOCK_QUEST};

#[test]
pub fn load_quest_type_flags() {
    prepare_mock_files();
    let quest = QuestFile::from_path(MOCK_QUEST).unwrap();

    let forced_equipement = ForcedEquipment {
        legs: 0,
        legs_attach1: 0,
        legs_attach2: 0,
        legs_attach3: 0,
        weapon: 0,
        weapon_attach1or_bitmask: 0,
        weapon_attach2: 0,
        weapon_attach3: 0,
        head: 0,
        head_attach1: 0,
        head_attach2: 0,
        head_attach3: 0,
        chest: 0,
        chest_attach1: 0,
        chest_attach2: 0,
        chest_attach3: 0,
        arms: 0,
        arms_attach1: 0,
        arms_attach2: 0,
        arms_attach3: 0,
        waist: 0,
        waist_attach1: 0,
        waist_attach2: 0,
        waist_attach3: 0,
        unk: 1,
    };

    assert_eq!(quest.quest_type_flags.forced_equipement, forced_equipement);

    let main_quest_prop = MainQuestProp {
        course: 18,
        hard_hunter_rank_req: 0,
        join_rank_max: 0,
        join_rank_min: 1,
        max_death: 3,
        objectives: QuestObjective {
            objective1: Objective {
                monster_id: 125,
                quantity: 1,
                quest_objective: 1,
                unk: 0,
            },
            objective2: Objective {
                monster_id: 0,
                quantity: 0,
                quest_objective: 0,
                unk: 0,
            },
            objective3: Objective {
                monster_id: 0,
                quantity: 0,
                quest_objective: 0,
                unk: 0,
            },
        },
        post_rank_max: 0,
        post_rank_min: 1,
        quest_fee: 700,
        quest_id: 23309,
        quest_locale_flags: 9,
        quest_map_only_monitor: 64,
        quest_strings_ptr: 10902,
        quest_time: 90000,
        rank_band0: 1,
        ranking_id: 7,
        reward_a: 0,
        reward_b: 0,
        reward_main: 2000,
        skip1: 0,
        skip2: [0u8; 2],
        unk0: 65,
        unk1: 64,
        unk10: 0,
        unk11: 0,
        unk12: 0,
        unk13: 0,
        unk2: 0,
        unk3: 2,
        requirement_to_finish: 2,
        unk7: 0,
        unk9: 0,
        unkk: 0,
        untat_id: 7,
    };

    assert_eq!(quest.quest_type_flags.main_quest_prop, main_quest_prop);

    let rewards_focus = RewardsFocus {
        exp_type_maybe: 1,
        item1: 9049,
        item2: 9050,
        item3: 9051,
        main_rp_grp: 1000,
        monster_icon1: 125,
        monster_icon2: 0,
        monster_icon3: 0,
        monster_icon4: 0,
        monster_icon5: 0,
        monster_variant3: 0,
        monster_variant4: 0,
        monster_variant5: 0,
        sub_a_rp_grp: 0,
        sub_b_rp_grp: 0,
    };

    assert_eq!(quest.quest_type_flags.rewards_focus, rewards_focus);

    let variants = Variants {
        map_variant0: 3,
        monster_variant0: 0,
        monster_variant1: 10,
        monster_variant2: 0,
        quest_variant1: 12,
        quest_variant2: 0,
        quest_variant3: 0,
        quest_variant4: 255,
        required_item_count: 0,
        required_item_type: 0,
        unk1: 0,
    };

    assert_eq!(quest.quest_type_flags.variants, variants);

    let quest_type_flags = QuestTypeFlags {
        allowed_equipment_bitmask: 0,
        forced_equipement,
        main_quest_prop,
        quest_clears_allowed: 0,
        quest_monster_icon: 0,
        rewards_focus,
        skip1: [0u8; 8],
        skip3: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        variants,
    };

    println!(
        "allowed_equipment_bitmask {:?}",
        quest.quest_type_flags.allowed_equipment_bitmask
    );
    println!(
        "quest_clears_allowed {:?}",
        quest.quest_type_flags.quest_clears_allowed
    );
    println!(
        "quest_monster_icon {:?}",
        quest.quest_type_flags.quest_monster_icon
    );
    println!("skip1 {:?}", quest.quest_type_flags.skip1);
    println!("skip3 {:?}", quest.quest_type_flags.skip3);
    assert_eq!(quest.quest_type_flags, quest_type_flags);
}
