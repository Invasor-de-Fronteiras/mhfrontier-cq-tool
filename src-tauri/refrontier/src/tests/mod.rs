use std::{fs::File, io::Result, path::Path};

use better_cursor::BetterRead;

use crate::refrontier;

pub fn compare_files(a: &str, b: &str) -> Result<bool> {
    let a_path = Path::new(a);
    let b_path = Path::new(b);

    let mut a_file = File::open(a_path).unwrap();
    let mut b_file = File::open(b_path).unwrap();
    let a_buffer = a_file.get_buffer()?;
    let b_buffer = b_file.get_buffer()?;
    
    let a_hash = crc32fast::hash(&a_buffer);
    let b_hash = crc32fast::hash(&b_buffer);

    Ok(a_hash == b_hash)
}

#[test]
pub fn ecd_decrypt() {
    refrontier::process_file("./mock/ecd_encrypted.bin", "./output/ecd_decrypted.bin").unwrap();
    let is_equal = compare_files("./output/ecd_decrypted.bin", "./mock/ecd_decrypted.bin").unwrap();
    let is_meta_equal = compare_files("./output/ecd_decrypted.meta", "./mock/ecd.bin.meta").unwrap();

    assert_eq!(is_equal, true);
    assert_eq!(is_meta_equal, true);
}

#[test]
pub fn ecd_encrypt() {
    let header = refrontier::load_ecd_header("./mock/ecd.bin.meta").unwrap();
    refrontier::encrypt_ecd_file("./mock/ecd_decrypted.bin", "./output/ecd_encrypted.bin", header).unwrap();
    let is_equal = compare_files("./output/ecd_encrypted.bin", "./mock/ecd_encrypted.bin").unwrap();

    assert_eq!(is_equal, true)
}

#[test]
pub fn jkr_0_decompress() {
    refrontier::process_file("./mock/jkr_0_compressed.bin", "./output/jkr_0_decompressed.bin").unwrap();
    let is_equal = compare_files("./output/jkr_0_decompressed.bin", "./mock/jkr_0_decompressed.bin").unwrap();

    assert_eq!(is_equal, true);
}

#[test]
pub fn jkr_0_compress() {
    refrontier::encode_jpk_file("./mock/jkr_0_decompressed.bin", "./output/jkr_0_compressed.bin", 0, 10).unwrap();
    let is_equal = compare_files("./output/jkr_0_compressed.bin", "./mock/jkr_0_compressed.bin").unwrap();

    assert_eq!(is_equal, true);
}

#[test]
pub fn jkr_3_decompress() {
    refrontier::process_file("./mock/jkr_3_compressed.bin", "./output/jkr_3_decompressed.bin").unwrap();
    let is_equal = compare_files("./output/jkr_3_decompressed.bin", "./mock/jkr_3_decompressed.bin").unwrap();

    assert_eq!(is_equal, true);
}

// #[test]
// pub fn jkr_3_compress() {
//     refrontier::encode_jpk_file("./mock/jkr_3_decompressed.bin", "./output/jkr_3_compressed.bin", 3, 10).unwrap();
//     let is_equal = compare_files("./output/jkr_3_compressed.bin", "./mock/jkr_3_compressed.bin").unwrap();

//     assert_eq!(is_equal, true);
// }