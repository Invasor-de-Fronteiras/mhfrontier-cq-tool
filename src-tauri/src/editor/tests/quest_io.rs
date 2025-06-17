use crate::editor::quest::quest_file::QuestFile;
use crate::editor::tests::utils::{
    get_file_hash, prepare_mock_files, MOCK_QUEST, MOCK_QUEST_SOURCE,
};

#[test]
pub fn write_preserves_input() {
    prepare_mock_files();
    let hash_before = get_file_hash(MOCK_QUEST).unwrap();
    let mut quest = QuestFile::from_path(MOCK_QUEST_SOURCE).unwrap();
    QuestFile::save_to(MOCK_QUEST, &mut quest).unwrap();

    let hash_after = get_file_hash(MOCK_QUEST).unwrap();

    assert_eq!(hash_before, hash_after);
}

#[test]
pub fn write_changes_input() {
    prepare_mock_files();

    let hash_before = get_file_hash(MOCK_QUEST).unwrap();
    let mut quest = QuestFile::from_path(MOCK_QUEST).unwrap();
    quest.quest_type_flags.main_quest_prop.quest_id = 1;
    QuestFile::save_to(MOCK_QUEST, &mut quest).unwrap();

    let hash_after = get_file_hash(MOCK_QUEST).unwrap();

    assert_ne!(hash_before, hash_after);

    let quest = QuestFile::from_path(MOCK_QUEST).unwrap();

    assert_eq!(quest.quest_type_flags.main_quest_prop.quest_id, 1);
}
