use crate::{BetterRead, BetterWrite, StructRead, StructWrite};
use better_cursor_core::better_cursor;
use std::io::Result;

#[derive(StructWrite, StructRead, Debug)]
struct BasicValues {
    a: u8,
    b: u16,
    c: u32,
    d: u64,
    e: f32,
    f: f64,
}

#[derive(StructRead, StructWrite, Debug)]
struct DeepValues {
    start: u8,
    basic_values: BasicValues,
    end: u16,
}

#[derive(StructRead, StructWrite, Debug)]
struct ArrayValues {
    a: u8,
    list: [u8; 10],
    b: u8,
}

#[test]
pub fn read_basic_values() {
    let buffer: Vec<u8> = vec![
        0x05, 0x01, 0x02, 0xFF, 0xFF, 0xFF, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
        0x00, 0x00, 0x28, 0x41, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x34, 0x40,
    ];
    let mut reader = better_cursor::from_buffer(buffer);

    let values = reader.read_struct::<BasicValues>().unwrap();

    assert_eq!(values.a, 5);
    assert_eq!(values.b, 513);
    assert_eq!(values.c, 16777215);
    assert_eq!(values.d, 72057594037927940);
    assert_eq!(values.e, 10.5);
    assert_eq!(values.f, 20.25);
}

#[test]
pub fn read_deep_values() {
    let buffer: Vec<u8> = vec![
        0x11, 0x05, 0x01, 0x02, 0xFF, 0xFF, 0xFF, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x00, 0x28, 0x41, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x34, 0x40, 0x20, 0x01,
    ];
    let mut reader = better_cursor::from_buffer(buffer);

    let values = reader.read_struct::<DeepValues>().unwrap();

    assert_eq!(values.start, 17);
    assert_eq!(values.end, 288);
    assert_eq!(values.basic_values.a, 5);
    assert_eq!(values.basic_values.b, 513);
    assert_eq!(values.basic_values.c, 16777215);
    assert_eq!(values.basic_values.d, 72057594037927940);
    assert_eq!(values.basic_values.e, 10.5);
    assert_eq!(values.basic_values.f, 20.25);
}

#[test]
pub fn read_array_values() {
    let buffer: Vec<u8> = vec![
        0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B,
    ];
    let mut reader = better_cursor::from_buffer(buffer);

    let values = reader.read_struct::<ArrayValues>().unwrap();

    println!("values: {:?}", values);
    assert_eq!(values.a, 0);
    assert_eq!(values.b, 11);
    assert_eq!(
        values.list,
        [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A]
    );
}

#[test]
pub fn write_basic_values() {
    let mut writer = better_cursor::from_buffer(vec![]);

    let insert_values = BasicValues {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 100.50,
        f: 10.10,
    };

    writer.write_struct(&insert_values).unwrap();
    let buffer = writer.get_buffer().unwrap();

    let mut reader = better_cursor::from_buffer(buffer);
    let values = reader.read_struct::<BasicValues>().unwrap();

    assert_eq!(values.a, 1);
    assert_eq!(values.b, 2);
    assert_eq!(values.c, 3);
    assert_eq!(values.d, 4);
    assert_eq!(values.e, 100.50);
    assert_eq!(values.f, 10.10);
}

#[test]
pub fn write_deep_values() {
    let mut writer = better_cursor::from_buffer(vec![]);

    let basic_values = BasicValues {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 100.50,
        f: 10.10,
    };

    let insert_values = DeepValues {
        start: 101,
        basic_values,
        end: 356,
    };

    writer.write_struct(&insert_values).unwrap();
    let buffer = writer.get_buffer().unwrap();

    let mut reader = better_cursor::from_buffer(buffer);
    let values = reader.read_struct::<DeepValues>().unwrap();

    assert_eq!(values.start, 101);
    assert_eq!(values.end, 356);

    assert_eq!(values.basic_values.a, 1);
    assert_eq!(values.basic_values.b, 2);
    assert_eq!(values.basic_values.c, 3);
    assert_eq!(values.basic_values.d, 4);
    assert_eq!(values.basic_values.e, 100.50);
    assert_eq!(values.basic_values.f, 10.10);
}

#[test]
pub fn write_array_values() {
    let mut writer = better_cursor::from_buffer(vec![]);

    let insert_values = ArrayValues {
        a: 11,
        b: 0,
        list: [0x0A, 0x09, 0x08, 0x07, 0x06, 0x05, 0x04, 0x03, 0x02, 0x01],
    };

    writer.write_struct(&insert_values).unwrap();
    let buffer = writer.get_buffer().unwrap();
    println!("{:?}", buffer);

    let mut reader = better_cursor::from_buffer(buffer);
    let values = reader.read_struct::<ArrayValues>().unwrap();

    assert_eq!(values.a, 11);
    assert_eq!(values.b, 0);
    assert_eq!(
        values.list,
        [0x0A, 0x09, 0x08, 0x07, 0x06, 0x05, 0x04, 0x03, 0x02, 0x01]
    );
}
