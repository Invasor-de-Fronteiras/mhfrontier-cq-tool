use better_cursor::{BetterCursor, BetterRead, BetterSeek, BetterWrite};
use crate::utils::custom_error::CustomResult;

pub struct DecoderLz {
    m_shift_index: i32,
    m_flag: u8
}

pub trait DecodeLz {

    fn decode_lz<T: BetterCursor>(&mut self, input: &mut T, offset: u32, size: u32) -> CustomResult<Vec<u8>> {
        let mut output = better_cursor::from_buffer(vec![]);
        input.seek_start(offset as u64).unwrap();

        while output.current_position()? < size as u64 {
            if self.jpkbit_lz(input)? == 0 {
                let byte = self.read_byte(input).unwrap();
                output.write_u8(&byte).unwrap();
                continue;
            }

            if self.jpkbit_lz(input)? == 0 {
                let len = (self.jpkbit_lz(input)? << 1) | self.jpkbit_lz(input).unwrap();
                let off = self.read_byte(input).unwrap();

                self.jpkcpy_lz(&mut output, off as u32, len as u32 + 3).unwrap();
                continue;
            }

            let hi = self.read_byte(input).unwrap();
            let lo = self.read_byte(input).unwrap();
            let len: u32 = (hi as u32 & 0xE0) >> 5;
            let off: u32 = ((hi as u32 & 0x1F) << 8) | lo as u32;

            if len != 0 {
                self.jpkcpy_lz(&mut output, off, len as u32 + 2).unwrap();
                continue;
            }

            if self.jpkbit_lz(input)? == 0 {
                let len = (self.jpkbit_lz(input)? << 3) | (self.jpkbit_lz(input)? << 2) | (self.jpkbit_lz(input)? << 1) | self.jpkbit_lz(input).unwrap();

                self.jpkcpy_lz(&mut output, off as u32, len as u32 + 2 + 8).unwrap();
                continue;
            }

            let temp = self.read_byte(input).unwrap();

            if temp == 0xFF {
                let buffer_length = off + 0x1B;
                for _ in 0..buffer_length {
                    let byte = self.read_byte(input).unwrap();
                    input.write_u8(&byte).unwrap();
                }
                continue;
            }

            self.jpkcpy_lz(&mut output, off as u32, temp as u32 + 0x1A).unwrap();
        }

        let buffer = output.get_buffer()?;

        Ok(buffer)
    }

    fn jpkcpy_lz<T: BetterCursor>(&mut self, buffer: &mut T, offset: u32, length: u32) -> CustomResult<()> {
        for _ in 0..length {
            let current_position = buffer.current_position().unwrap();
            buffer.seek_start(current_position - offset as u64 - 1).unwrap();
    
            let byte = buffer.read_u8().unwrap();
            buffer.seek_start(current_position).unwrap();
            buffer.write_u8(&byte).unwrap();
        }
    
        Ok(())
    }

    fn read_byte<T: BetterCursor>(&mut self, input: &mut T) -> CustomResult<u8> {
        Ok(input.read_u8()?)
    }

    fn jpkbit_lz<T: BetterCursor>(&mut self, input: &mut T) -> CustomResult<u8>;
}

impl DecodeLz for DecoderLz {
    fn jpkbit_lz<T: BetterCursor>(&mut self, input: &mut T) -> CustomResult<u8> {
        self.m_shift_index -= 1;

        if self.m_shift_index < 0 {
            self.m_shift_index = 7;
            self.m_flag = self.read_byte(input)?;
        }

        Ok((self.m_flag >> self.m_shift_index) & 0x01)
    }
}

pub fn decode_lz<T: BetterCursor>(input: &mut T, offset: u32, size: u32) -> CustomResult<Vec<u8>> {
    let mut decoder = DecoderLz { m_flag: 0, m_shift_index: 0 };
    let buffer = decoder.decode_lz(input, offset, size)?;
    Ok(buffer)
}