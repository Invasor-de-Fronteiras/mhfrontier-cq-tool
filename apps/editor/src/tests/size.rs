use crate::{
    quest::quest_type_flags::QuestTypeFlags,
};
use std::mem::size_of;


#[test]
fn size_test() {
    let size = size_of::<QuestTypeFlags>();

    println!("size: {}", size);

    // panic!();
}