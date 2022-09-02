use crate::file::writer::FileWriter;

#[test]
fn remove_end_bytes() {
    let mut quest = FileWriter::from_filename("quest-tests/21085d0.bin").unwrap();

    let len_original = quest.get_len().unwrap();
    quest.set_len(len_original - 5).unwrap();

    let len = quest.get_len().unwrap();
    quest.seek_start(len).unwrap();
    quest.write_u8(&1).unwrap();
    quest.write_u8(&2).unwrap();
    quest.write_u8(&3).unwrap();
    quest.write_u8(&4).unwrap();
    quest.write_u8(&6).unwrap();
}
