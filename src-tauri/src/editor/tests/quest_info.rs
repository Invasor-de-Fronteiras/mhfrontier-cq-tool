use crate::editor::{questlist::quest_info::QuestInfo, save_json::save_to_json};

#[test]
fn quest_info_from_questfile_test() {
    let quest_file = QuestInfo::from_questfile("quest-tests/21085d0.bin").unwrap();

    save_to_json("output/21085d0-questinfo.json", &quest_file).unwrap();
}
