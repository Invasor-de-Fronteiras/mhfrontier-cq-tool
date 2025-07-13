use crate::editor::quest::quest_file::QuestFile;
use crate::editor::quest::reward::{RewardItem, RewardTable, RewardTableHeader, Rewards};
use crate::editor::tests::utils::{prepare_mock_files, MOCK_QUEST};

#[test]
pub fn load_rewards() {
    prepare_mock_files();
    let quest = QuestFile::from_path(MOCK_QUEST).unwrap();

    let reward = RewardTable {
        items: vec![
            RewardItem {
                item: 9049,
                quantity: 1,
                rate: 48,
            },
            RewardItem {
                item: 9050,
                quantity: 1,
                rate: 50,
            },
            RewardItem {
                item: 9051,
                quantity: 2,
                rate: 2,
            },
        ],
        table_header: RewardTableHeader {
            table_id: 1,
            table_offset: 10882,
            unk_0: 128,
            unk_1: 0,
        },
    };

    let rewards = Rewards(vec![reward]);

    assert_eq!(quest.rewards, rewards);
}
