pub mod quest_file;
pub mod reader;
pub mod save_json;
pub mod structs;
pub mod offsets;
pub mod writter;

use quest_file::QuestFile;

// pub fn main_test(input: &str, output: &str) {

//     let result = QuestFile::from_path(input);

//     if let Ok(quest) = result {
//         if let Err(result) = save_json::save_quest_to_json(output, &quest) {
//             println!("failed to save json!");
//         }
//     } else {
//         println!("quest file not found!");
//         // let message = !json!({ "teste": "teste" });
//         let quest = QuestFile {
//             header: structs::header::QuestFileHeader { quest_type_ptr: 0, loaded_stages_ptr: 0, supply_box_ptr: 0, reward_ptr: 0, sub_supply_box_ptr: 0, unk0: 0, sub_supply_box_len: 0, quest_area_ptr: 0, large_monster_ptr: 0, area_floats: 0, unk_floats1: 0, unk_ptr3: 0, unk_ptr4: 0, unk_ptr5: 0, unk_ptr6: 0, unk_ptr7: 0, gathering_pointers: 0, unk_ptr8: 0, unk_ptr9: 0 },
//             large_monster_ids: vec![],
//             large_monster_pointers: structs::monsters::LargeMonsterPointers { unk_0: 0, unk_1: 0, large_monster_ids: 0, large_monster_spawns: 0, unk_2: 0, unk_3: 0, unk_4: 0, unk_5: 0 },
//             large_monster_spawns: vec![]
//         };

//         if let Err(result) = save_json::save_quest_to_json(output, &quest) {
//             println!("failed to save json!");
//         }
//     }
// }


#[cfg(test)]
mod tests;
