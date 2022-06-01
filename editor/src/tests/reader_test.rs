use crate::quest_file::QuestFile;

#[test]
fn reader_test() {
    // let mut buffer = read_test_file();
    let quest_file = QuestFile::from_path("./21085d0.bin");

    // Headers
    assert_eq!(quest_file.header.quest_type_ptr, 192);
    assert_eq!(quest_file.header.loaded_stages_ptr, 512);
    assert_eq!(quest_file.header.supply_box_ptr, 15360);
    assert_eq!(quest_file.header.reward_ptr, 15200);

    assert_eq!(quest_file.header.sub_supply_box_ptr, 15552);
    assert_eq!(quest_file.header.unk0, 0);
    assert_eq!(quest_file.header.sub_supply_box_len, 128);

    assert_eq!(quest_file.header.quest_area_ptr, 816);
    assert_eq!(quest_file.header.large_monster_ptr, 5920);
    assert_eq!(quest_file.header.area_floats, 8576);
    assert_eq!(quest_file.header.unk_floats1, 8224);
    assert_eq!(quest_file.header.unk_ptr3, 11248);
    assert_eq!(quest_file.header.unk_ptr4, 6816);
    assert_eq!(quest_file.header.unk_ptr5, 6368);
    assert_eq!(quest_file.header.unk_ptr6, 15524);
    assert_eq!(quest_file.header.unk_ptr7, 576);
    assert_eq!(quest_file.header.gathering_pointers, 12448);
    assert_eq!(quest_file.header.unk_ptr8, 12256);
    assert_eq!(quest_file.header.unk_ptr9, 11264);

    // Monster pointers
    assert_eq!(quest_file.large_monster_pointers.large_monster_ids, 5952);
    assert_eq!(quest_file.large_monster_pointers.large_monster_spawns, 59841);

    println!("quest:{:?}", quest_file);
}
