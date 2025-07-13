use crate::editor::quest::loaded_stages::{LoadedStage, LoadedStages};
use crate::editor::quest::quest_file::QuestFile;
use crate::editor::tests::utils::{prepare_mock_files, MOCK_QUEST};

#[test]
pub fn load_loaded_stages() {
    prepare_mock_files();
    let quest = QuestFile::from_path(MOCK_QUEST).unwrap();

    let loaded_stages: LoadedStages = vec![
        LoadedStage {
            stage_id: 361,
            unk1: 0,
            unk2: 0,
            unk3: 0,
        },
        LoadedStage {
            stage_id: 361,
            unk1: 0,
            unk2: 0,
            unk3: 0,
        },
        LoadedStage {
            stage_id: 361,
            unk1: 0,
            unk2: 0,
            unk3: 0,
        },
        LoadedStage {
            stage_id: 363,
            unk1: 0,
            unk2: 0,
            unk3: 0,
        },
    ];

    assert_eq!(quest.loaded_stages, loaded_stages);
}
