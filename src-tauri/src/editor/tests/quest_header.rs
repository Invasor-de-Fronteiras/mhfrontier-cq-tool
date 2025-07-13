use crate::editor::quest::header::QuestFileHeader;
use crate::editor::quest::quest_file::QuestFile;
use crate::editor::tests::utils::{prepare_mock_files, MOCK_QUEST};

#[test]
pub fn load_header() {
    prepare_mock_files();
    let quest = QuestFile::from_path(MOCK_QUEST).unwrap();

    let header = QuestFileHeader {
        area_change: 5120,
        area_maping: 4928,
        base_camp_inf: 4040,
        fixed_cords1: 576,
        fixed_cords2: 7136,
        fixed_inf: 6444,
        gather_points: 4288,
        gathering_pointers: 7328,
        large_monster_ptr: 3616,
        loaded_stages_ptr: 512,
        map_info: 6428,
        quest_area_ptr: 11318,
        quest_type_ptr: 192,
        reward_ptr: 10872,
        some_strings: 10276,
        sub_supply_box_len: 128,
        sub_supply_box_ptr: 10304,
        supply_box_ptr: 10112,
        unk0: 0,
    };

    assert_eq!(quest.header, header);
}
