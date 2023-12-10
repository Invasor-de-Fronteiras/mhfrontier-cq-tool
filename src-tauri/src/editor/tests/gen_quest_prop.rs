use crate::editor::{
    file::reader::FileReader,
    quest::offsets::GEN_QUEST_PROP_PRT,
    quest::quest_type_flags::{GenQuestProp, Quantity},
};

#[test]
fn gen_quest_prop() {
    let mut reader = FileReader::from_filename("quest-tests/21085d0.bin").unwrap();

    let expected = GenQuestProp {
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
    };

    reader.seek_start(GEN_QUEST_PROP_PRT as u64).unwrap();
    let gen_quest_prop = reader.read_struct::<GenQuestProp>().unwrap();

    assert_eq!(gen_quest_prop, expected);
}
