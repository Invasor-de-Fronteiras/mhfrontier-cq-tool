use std::cmp::min;
use std::io::{Cursor, Result};

use better_cursor::{BetterCursor, BetterRead, BetterWrite, BetterSeek};
use crate::pack::jpk::JpkHeader;
use crate::utils::custom_error::CustomResult;

pub struct EncoderLz {
    m_flag: u8,
    m_shift_index: i32,
    m_level: u32,
    m_maxdist: u32,
    m_to_write: Cursor<Vec<u8>>,
    encoded_buffer: Cursor<Vec<u8>>,
    total_logs: u8
}

pub struct RepResult {
    ofs: u32,
    len: u32
}

impl RepResult {

    pub fn empty() -> RepResult {
        RepResult { len: 0, ofs: 0 }
    }
}

impl EncoderLz {

    pub fn new() -> EncoderLz {
        EncoderLz {
            m_flag: 0,
            m_shift_index: 0,
            m_level: 280,
            m_maxdist: 0x300,
            m_to_write: better_cursor::from_buffer(vec![]),
            encoded_buffer: better_cursor::from_buffer(vec![]),
            total_logs: 0
        }
    }

    pub fn debug(&mut self, text: String) {
        if self.total_logs < 255 {
        println!("{}", text);
            self.total_logs += 1;
        }
    }

    pub fn reset(&mut self) {
        self.m_flag = 0;
        self.m_shift_index = 8;
        self.m_level = 280;
        self.m_maxdist = 0x300;
        self.m_to_write = better_cursor::from_buffer(vec![]);
        self.encoded_buffer = better_cursor::from_buffer(vec![]);
    }

    pub fn find_rep<T: BetterCursor>(&mut self, input: &mut T) -> Result<RepResult> {
        let current_ptr = input.current_position()? as u32; // 13
        let input_length = input.len()?;

        let nlen = min(self.m_level, input_length as u32 - current_ptr);

        if current_ptr == 0 || nlen < 3 {
            return Ok(RepResult::empty())
        }

        let ista = if current_ptr < self.m_maxdist { 0 } else { current_ptr - self.m_maxdist };

        let mut psta = ista;
        let pcur = current_ptr;

        let mut len: u32 = 0;
        let mut ofs: u32 = 0;

        while psta < pcur {
            let pfin = psta + nlen;

            let mut lenw: u32 = 0;
            let mut pb = psta;
            let mut pb2 = pcur;

            while pb < pfin {
                input.seek_start(pb as u64)?;
                let pb_value = input.read_u8()?;

                input.seek_start(pb2 as u64)?;
                let pb2_value = input.read_u8()?;

                if pb_value != pb2_value {
                    break;
                }

                pb += 1;
                pb2 += 1;
                lenw += 1;
            }

            if lenw > len && lenw >= 3 {
                len = lenw;
                ofs = pcur - psta - 1;

                if len >= nlen {
                    break;
                }
            }

            psta += 1;
        }

        input.seek_start(current_ptr as u64)?;

        Ok(RepResult {
            len,
            ofs
        })
    }

    pub fn flush_flag(&mut self, final_flag: bool) -> Result<()> {
        self.debug("flush_flag".to_string());
        let current_position = self.m_to_write.current_position()?;
        if !final_flag || current_position > 0 {
            self.write_byte(self.m_flag)?;
        }

        self.m_flag = 0;
        self.m_to_write.seek_start(0)?;
        for _ in 0..current_position {
            let value = self.m_to_write.read_u8()?;
            self.write_byte(value)?;
        }

        self.m_to_write.seek_start(0)?;
        Ok(())
    }

    pub fn set_flag(&mut self, flag: u8) -> Result<()> {
        self.m_shift_index -= 1;

        if self.m_shift_index < 0 {
            self.m_shift_index = 7;
            self.flush_flag(false)?;
        }

        self.m_flag |= flag << self.m_shift_index;
        Ok(())
    }

    pub fn set_flags_l(&mut self, flag: u8, cnt: i32) -> Result<()> {
        for i in (0..cnt).rev() {
            self.set_flag((flag >> i) & 1)?;
        }
        Ok(())
    }

    pub fn encode_lz<T: BetterCursor>(&mut self, input: &mut T, header: JpkHeader, level: u32) -> Result<Vec<u8>> {
        self.reset();
        if level < 6 {
            self.m_level = 6;
        } else if level > 280 {
            self.m_level = 280;
        } else {
            self.m_level = level;
        }

        if level < 50 {
            self.m_maxdist = 50;
        } else if level > 0x1FFF {
            self.m_maxdist = 0x1FFF;
        } else {
            self.m_maxdist = level;
        }

        let header = header;

        input.seek_start(0)?;
        self.encoded_buffer.write_struct(&header)?;

        let input_len: u64 = input.len()?;
        
        while input.current_position()? < input_len {
            let current_input = input.current_position()?;
            let current_temp = self.m_to_write.current_position()?;
            let current_encoded = self.encoded_buffer.current_position()?;

            self.debug(format!("current input {:#04x}, current encoded {:#04x}, current output {:#04x}", current_input, current_encoded, current_temp));
            let rep = self.find_rep(input)?;
            self.debug(format!("rep.length {}, rep.ofs {}", rep.len, rep.ofs));

            if rep.len == 0 {
                self.set_flag(0)?;
                let value = input.read_u8()?;
                self.m_to_write.write_u8(&value)?;
                continue;
            }

            self.set_flag(1)?;
            if rep.len <= 6 && rep.ofs <= 0xFF {
                self.set_flag(0)?;
                self.set_flags_l((rep.len - 3) as u8, 2)?;
                self.m_to_write.write_u8(&(rep.ofs as u8))?;

                input.seek_current(rep.len as i64)?;
                continue;
            }

            self.set_flag(1)?;
            let mut value_u16 = rep.ofs as u16;
            if rep.len <= 9 {
                value_u16 |= ((rep.len - 2) << 13) as u16;
            }

            let hi = (value_u16 >> 8) as u8;
            let lo = (value_u16 & 0xFF) as u8;

            self.m_to_write.write_u8(&hi)?;
            self.m_to_write.write_u8(&lo)?;
            input.seek_current(rep.len as i64)?;

            if rep.len > 9 {
                if rep.len <= 25 {
                    self.set_flag(0)?;
                    self.set_flags_l((rep.len - 10) as u8, 4)?;
                } else {
                    self.set_flag(1)?;
                    let value = (rep.len - 0x1A) as u8;
                    self.m_to_write.write_u8(&value)?;
                }
            }
        }

        self.flush_flag(true)?;

        let buffer = self.encoded_buffer.get_buffer()?;
        Ok(buffer)
    }

    pub fn write_byte(&mut self, value: u8) -> Result<()> {
        self.encoded_buffer.write_u8(&value)?;

        Ok(())
    }
}


pub fn encode_lz<T: BetterCursor>(input: &mut T, header: JpkHeader, level: u32) -> CustomResult<Vec<u8>> {
    let mut encoder_lz = EncoderLz::new();
    let buffer = encoder_lz.encode_lz(input, header, level)?;

    Ok(buffer)
}