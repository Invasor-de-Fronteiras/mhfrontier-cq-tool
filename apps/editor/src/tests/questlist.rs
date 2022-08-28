use encoding_rs::SHIFT_JIS;

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
    let questlist = QuestlistFile::from_path("questlist-tests/list_1.bin").unwrap();
    save_to_json("output/list_1.json", &questlist).unwrap();

    assert_eq!(questlist.header.quest_count, 1, "total quests (header)");
    assert_eq!(questlist.quests.len(), 1, "total quests");
}

#[test]
fn read_string() {
    // let buf: [u8; 23] = [ 18, 131, 89, 137, 91, 131, 58, 88, 182, 142, 89, 130, 204, 131, 88, 131, 88, 131, 129, 44, 151, 05, 65 ];
    // let buf: [u8;31] = [26, 131, 110, 131, 147, 131, 94, 129, 91, 143, 148, 140, 78, 130, 214, 138, 180, 142, 211, 130, 240, 141, 158, 130, 223, 130, 196, 29, 93, 48, 210];

    let buf: [u8;10] = [0x3D, 0x9A, 0x31, 0x8D, 0x3D, 0x52, 0x60, 0x60, 0x60, 0x00];
    let (res, _enc, errors) = SHIFT_JIS.decode(&buf);
    if errors {
        println!("invalid text");
    } else {
        println!("result: {}", res.to_string());
        println!("len: {}", res.to_string().len());
    }  

    // assert_eq!(buf.len(), 1, "total quests");

}

