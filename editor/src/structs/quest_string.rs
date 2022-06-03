use serde_derive::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[repr(C)]
pub struct QuestStringsPointers {
    quest_title: u32,
    quest_main: u32,
    quest_a: u32,
    quest_b: u32,
    quest_clear_reqs: u32,
    quest_fail_reqs: u32,
    quest_contractor: u32,
    quest_description: u32,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct QuestString {
    pointer: u32,
    hex: Vec<u8>,
    string: String
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct QuestStrings {
    quest_title: QuestString,
    quest_main: QuestString,
    quest_a: QuestString,
    quest_b: QuestString,
    quest_clear_reqs: QuestString,
    quest_fail_reqs: QuestString,
    quest_contractor: QuestString,
    quest_description: QuestString,
}