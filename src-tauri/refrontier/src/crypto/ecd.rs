
use std::io::Result;
use crc32fast;

use better_cursor::{BetterCursor, BetterRead, BetterSeek, BetterWrite, StructRead, StructWrite};
use crate::utils::custom_error::CustomResult;

// from addr 0x10292DCC
const RND_BUF_ECD: [u8; 48] = [
    0x4A, 0x4B, 0x52, 0x2E, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x0D, 0xCD, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x01, 0x0D, 0xCD, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x0D, 0xCD, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x19, 0x66, 0x0D, 0x00, 0x00, 0x00, 0x03, 0x7D, 0x2B, 0x89, 0xDD, 0x00, 0x00, 0x00, 0x01
];

pub fn get_rnd_from_buffer(offset: u32) -> Result<u32> {
    let mut cursor = better_cursor::from_buffer(RND_BUF_ECD.to_vec());
    cursor.seek_start(offset as u64)?;
    let value: u32 = cursor.read_u32_be()?;
    Ok(value)
}

#[derive(StructRead, StructWrite, Debug, Clone)]
pub struct EcdHeader {
    pub header_sign: u32,
    pub index: u16,
    pub unk1: u8,
    pub unk2: u8,
    pub fsize: u32,
    pub crc32: u32
}

struct RndEcd {
    index: u16,
    rnd: u32,
}

impl RndEcd {

    pub fn from_header(header: &EcdHeader) -> RndEcd {
        let rnd = (header.crc32 << 16) | (header.crc32 >> 16) | 1;

        RndEcd {
            index: header.index,
            rnd
        }
    }

    pub fn get_rnd_ecd(&mut self) -> Result<u32> {
        let index = self.index as u32;
        let a = (self.rnd as u64 * get_rnd_from_buffer(8 * index)? as u64) as u32;
        let b = get_rnd_from_buffer(8 * index + 4)?;
        let rnd = a + b;
        self.rnd = rnd;
        Ok(rnd)
    }
}

pub fn is_ecd_header(header: u32) -> bool {
    header == 0x1A646365
}

#[derive(Debug)]
pub struct EcdResult {
    pub header: EcdHeader,
    pub buffer: Vec<u8>
}

pub fn decrypt_ecd<R: BetterCursor>(input: &mut R) -> CustomResult<EcdResult> {
    let header = input.read_struct::<EcdHeader>()?;
    let mut ouput = better_cursor::from_buffer(vec![]);
    let mut rnd = RndEcd::from_header(&header);
    let mut xorpad = rnd.get_rnd_ecd()?;
    let mut r8 = xorpad as u8;

    for _ in 0..header.fsize {
        xorpad = rnd.get_rnd_ecd()?;

        let data = input.read_u8()?;
        let mut r11: u32 = data as u32 ^ r8 as u32;
        let mut r12: u32 = (r11 >> 4) & 0xFF;

        for _ in 0..8 {
            let r10: u32 = xorpad ^ r11;
            r11 = r12;
            r12 = r12 ^ r10;
            r12 = r12 & 0xFF;
            xorpad = xorpad >> 4;
        }

        let result = (r12 & 0xF) | ((r11 & 0xF) << 4);
        r8 = result as u8;

        ouput.write_u8(&r8)?;
    }

    let result = EcdResult {
        header,
        buffer: ouput.get_buffer()?,
    };

    Ok(result)
}

pub fn encrypt_ecd<R: BetterCursor>(input: &mut R, header: EcdHeader) -> CustomResult<Vec<u8>> {
    let mut output = better_cursor::from_buffer(vec![]);
    let buffer = input.get_buffer()?;
    
    let mut out_header = header.clone();
    out_header.fsize = buffer.len() as u32;
    out_header.crc32 = crc32fast::hash(&buffer);

    drop(buffer);

    println!("write header {:?}", out_header);
    output.write_struct(&out_header)?;

    let ptr = output.current_position()?;
    // for (i = 16 + fsize; i < buf.Length; i++) buf[i] = 0;
    for _ in 0..out_header.fsize {
        output.write_u8(&0)?;
    }

    output.seek_start(ptr)?;

    let mut rnd = RndEcd::from_header(&out_header);
    let mut xorpad = rnd.get_rnd_ecd()?;
    let mut r8 = xorpad as u8;

    for _ in 0..out_header.fsize {
        xorpad = rnd.get_rnd_ecd()?;

        let data = input.read_u8()?;
        let mut r11: u32 = 0;
        let mut r12: u32 = 0;

        for _ in 0..8 {
            let r10: u32 = xorpad ^ r11;
            r11 = r12;
            r12 ^= r10;
            r12 = r12 & 0xFF;
            xorpad = xorpad >> 4;
        }

        let mut dig2 = data as u32;
        let mut dig1 = (dig2 >> 4) & 0xFF;

        dig1 ^= r11;
        dig2 ^= r12;
        dig1 ^= dig2;

        let mut rr = ((dig2 & 0xF) | ((dig1 & 0xF) << 4)) as u8;
        rr = rr ^ r8;
        
        output.write_u8(&rr)?;
        r8 = data;
    }

    Ok(output.get_buffer()?)
}