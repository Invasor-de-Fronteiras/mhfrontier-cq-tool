use crate::editor::quest::monsters::{LargeMonsterPointers, LargeMonsterSpawn, LargeMonsters};
use crate::editor::quest::quest_file::QuestFile;
use crate::editor::tests::utils::{prepare_mock_files, MOCK_QUEST};

#[test]
pub fn load_large_monster() {
    prepare_mock_files();
    let quest = QuestFile::from_path(MOCK_QUEST).unwrap();

    let large_monster_ids: Vec<u32> = vec![125];

    assert_eq!(quest.large_monsters.large_monster_ids, large_monster_ids);

    let large_monster_pointers = LargeMonsterPointers {
        large_monster_ids: 13732,
        large_monster_spawns: 13740,
        unk_0: 1,
        unk_1: 0,
        unk_2: 0,
        unk_3: 0,
        unk_4: 0,
        unk_5: 0,
    };

    assert_eq!(
        quest.large_monsters.large_monster_pointers,
        large_monster_pointers
    );

    let large_monster_spawns = vec![LargeMonsterSpawn {
        monster_id: 125,
        spawn_amount: 1,
        spawn_stage: 367,
        unk0: 0,
        unk1: 0,
        unk10: 0,
        unk11: 0,
        unk12: 0,
        unk2: 0,
        unk4: 0,
        unk5: 0,
        unk6: 0,
        unk7: 0,
        unk8: 56880,
        unk9: 0,
        x_position: 10687.0,
        y_position: 0.0,
        z_position: 7429.0,
    }];

    assert_eq!(
        quest.large_monsters.large_monster_spawns,
        large_monster_spawns
    );

    let large_monsters = LargeMonsters {
        large_monster_ids,
        large_monster_pointers,
        large_monster_spawns,
    };

    assert_eq!(quest.large_monsters, large_monsters);
}
