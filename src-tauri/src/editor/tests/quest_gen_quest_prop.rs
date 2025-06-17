use crate::editor::quest::quest_file::QuestFile;
use crate::editor::quest::quest_type_flags::{GenQuestProp, Quantity};
use crate::editor::tests::utils::{prepare_mock_files, MOCK_QUEST};

#[test]
pub fn load_gen_quest_prop() {
    prepare_mock_files();
    let quest = QuestFile::from_path(MOCK_QUEST).unwrap();

    let quantity = Quantity {
        area1zones: 6,
        area2zones: 6,
        area3zones: 6,
        area4zones: 6,
        gathering_tables_qty: 76,
        unk0: 6,
    };

    assert_eq!(quest.gen_quest_prop.quantity, quantity);

    let skip1 = [0u8; 4];
    let skip2 = [0u8; 9];
    let skip3 = [0u8; 7];

    assert_eq!(quest.gen_quest_prop.skip1, skip1);
    assert_eq!(quest.gen_quest_prop.skip2, skip2);
    assert_eq!(quest.gen_quest_prop.skip3, skip3);

    let gen_quest_prop = GenQuestProp {
        big_monster_size_multi: 100,
        kn: 0,
        little_mons_stat_table: 53,
        main_rank_points: 1000,
        mons_stat_table1: 53,
        monster_class_id: 7,
        quantity: quantity,
        quest_kn0: 1,
        quest_kn1: 2,
        quest_kn2: 3,
        quest_kn3: 56,
        size_range: 4,
        skip1,
        skip2,
        skip3,
        sub_arank_points: 0,
        sub_brank_points: 0,
        unk3: 0,
        unk4: 0,
        unk5: 0,
    };

    assert_eq!(quest.gen_quest_prop, gen_quest_prop);
}
