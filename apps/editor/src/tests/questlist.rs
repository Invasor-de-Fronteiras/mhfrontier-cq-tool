
use crate::{
    questlist::questlist_file::QuestlistFile,
    save_json::save_to_json,
};

#[test]
fn read_questlist() {
    let questlist = QuestlistFile::from_path("questlist-tests/list_1.bin").unwrap();
    save_to_json("output/list_1.json", &questlist).unwrap();

    assert_eq!(questlist.header.quest_count, 42, "total quests (header)");
    assert_eq!(questlist.quests.len(), 42, "total quests");
}
