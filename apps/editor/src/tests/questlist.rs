use crate::{
    save_json::save_to_json,
    questlist::questlist_file::QuestlistFile,
};

#[test]
fn read_all_questlists() {
    let questlists = QuestlistFile::read_all_questlist("questlist-tests").unwrap();

    for questlist in &questlists {
        save_to_json(&format!("output/{}.json", questlist.filename), questlist).unwrap();
    }

    assert_eq!(questlists.len(), 1, "total questlists");
    assert_eq!(questlists[0].header.quest_count, 1, "total quests (header)");
    assert_eq!(questlists[0].quests.len(), 1, "total quests");
}

#[test]
fn read_questlist() {
    let questlist = QuestlistFile::from_path("questlist-tests/list_0.bin").unwrap();
    save_to_json("output/list_0.json", &questlist).unwrap();

    assert_eq!(questlist.header.quest_count, 1, "total quests (header)");
    assert_eq!(questlist.quests.len(), 1, "total quests");
}
