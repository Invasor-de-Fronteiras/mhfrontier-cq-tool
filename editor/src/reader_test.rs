use std::{fs::File, io::BufReader, path::Path};

use crate::reader::reader;

fn read_test_file() -> BufReader<File> {
    let filename = Path::new("./21085d0.bin");

    println!("{:?}", filename);
    let f = File::open(filename).unwrap();
    return BufReader::new(f);
}

#[test]
fn reader_test() {
    let mut buffer = read_test_file();
    let quest_file = reader(&mut buffer);
    // println!("{:?}", buffer.buffer().take(..200).unwrap());

    assert_eq!(quest_file.header.quest_type_ptr, 192);
    assert_eq!(quest_file.header.loaded_stages_ptr, 512);
    assert_eq!(quest_file.header.supply_box_ptr, 15360);
    assert_eq!(quest_file.header.reward_ptr, 15200);
    assert_eq!(quest_file.header.sub_supply_box_ptr, 15552);
    assert_eq!(quest_file.header.unk0, 0);
    assert_eq!(quest_file.header.sub_supply_box_len, 128);
    assert_eq!(quest_file.header.quest_area_ptr, 816);
    assert_eq!(quest_file.header.large_monster_ptr, 5920);
    assert_eq!(quest_file.header.area_floats, 8576);
    assert_eq!(quest_file.header.unk_floats1, 8224);
    assert_eq!(quest_file.header.unk_ptr3, 11248);
    assert_eq!(quest_file.header.unk_ptr4, 6816);
    assert_eq!(quest_file.header.unk_ptr5, 6368);
    assert_eq!(quest_file.header.unk_ptr6, 15524);
    assert_eq!(quest_file.header.unk_ptr7, 576);
    assert_eq!(quest_file.header.gathering_pointers, 12448);
    assert_eq!(quest_file.header.unk_ptr8, 12256);
    assert_eq!(quest_file.header.unk_ptr9, 11264);
    // assert_eq!(quest_file.header.quest_type_ptr, 192, "quest_type_ptr not is 5920, value = {}", quest_file.header.large_monster_ptr);
    // assert_eq!(quest_file.header.large_monster_ptr, 5920, "large_monster_ptr not is 5920, value = {}", quest_file.header.large_monster_ptr);
    // assert_eq!(quest_file.monster_pointers.large_monster_ids, 5952);
    // assert_eq!(quest_file.monster_pointers.large_monster_spawns, 5984);
    // assert_eq!(result, 3, "Result is {}, expect 3", result);
}


// ---- reader_test::reader_test stdout ----
// "./21085d0.bin"
// num_bytes: 68
// buffer: [c0, 0, 0, 0, 0, 2, 0, 0, 0, 3c, 0, 0, 60, 3b, 0, 0, c0, 3c, 0, 80, 30, 3, 0, 0, 20, 17, 0, 0, 80, 21, 0, 0, 20, 20, 0, 0, f0, 2b, 0, 0, a0, 1a, 0, 0, e0, 18, 0, 0, a4, 3c, 0, 0, 40, 2, 0, 0, a0, 30, 0, 0, e0, 2f, 0, 0, 0, 2c, 0, 0]
// num_bytes: 32
// buffer: [0, 0, 0, 0, 8, 11, 0, 0, 20, 11, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 90, f, 0, 0, a0, f, 0, 0, 73, 0, 0, 0]
// num_bytes: 48
// buffer: [0, 0, 44, 16, 0, 0, 60, 16, 0, 0, 6f, 0, 0, 0, 0, 0, 0, 0, 80, 14, 0, 0, a0, 14, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0, 88, 12, 0, 0, a0, 12, 0, 0, 71, 0, 0, 0, 0, 0]
// thread 'reader_test::reader_test' panicked at 'assertion failed: `(left == right)`
//   left: `11264`,
//  right: `15552`', editor\src\reader_test.rs:23:5
// note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace


// ---- reader_test::reader_test stdout ----
// "./21085d0.bin"
// num_bytes: 68
// buffer: [c0, 0, 0, 0, 0, 2, 0, 0, 0, 3c, 0, 0, 60, 3b, 0, 0, c0, 3c, 0, 80, 30, 3, 0, 0, 20, 17, 0, 0, 80, 21, 0, 0, 20, 20, 0, 0, f0, 2b, 0, 0, a0, 1a, 0, 0, e0, 18, 0, 0, a4, 3c, 0, 0, 40, 2, 0, 0, a0, 30, 0, 0, e0, 2f, 0, 0, 0, 2c, 0, 0]
// num_bytes: 32
// buffer: [0, 0, 0, 0, 8, 11, 0, 0, 20, 11, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 90, f, 0, 0, a0, f, 0, 0, 73, 0, 0, 0]
// num_bytes: 48
// buffer: [0, 0, 44, 16, 0, 0, 60, 16, 0, 0, 6f, 0, 0, 0, 0, 0, 0, 0, 80, 14, 0, 0, a0, 14, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0, 88, 12, 0, 0, a0, 12, 0, 0, 71, 0, 0, 0, 0, 0]
// thread 'reader_test::reader_test' panicked at 'assertion failed: `(left == right)`
//   left: `11264`,
//  right: `15552`', editor\src\reader_test.rs:23:5
// note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace