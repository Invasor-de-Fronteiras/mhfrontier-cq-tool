use std::io::{Cursor, Read, Result};
use std::mem::{forget, size_of, MaybeUninit};
use std::{slice, usize};

use encoding_rs::{Encoding, SHIFT_JIS, UTF_8};

use super::seek::BetterSeek;

pub trait CustomRead
where
    Self: Sized,
{
    fn read<R: BetterRead + ?Sized>(reader: &mut R) -> Result<Self>;
}

pub trait StructRead
where
    Self: Sized,
{
    fn read<R: BetterRead + ?Sized>(reader: &mut R) -> Result<Self>;
}

pub trait BetterRead
where
    Self: Read + BetterSeek,
{
    fn get_buffer(&mut self) -> Result<Vec<u8>> {
        let mut buffer = Vec::<u8>::new();
        let current_position = self.current_position()?;
        self.seek_start(0)?;
        self.read_to_end(&mut buffer)?;
        self.seek_start(current_position)?;

        Ok(buffer)
    }

    fn to_buffer_reader(&mut self) -> Result<Cursor<Vec<u8>>> {
        let buffer = self.get_buffer()?;

        Ok(Cursor::new(buffer))
    }

    unsafe fn read_struct_unsafe<T>(&mut self) -> Result<T> {
        let num_bytes = size_of::<T>();

        let mut data = MaybeUninit::<T>::uninit().assume_init();

        #[allow(unused_mut)]
        let mut buffer = slice::from_raw_parts_mut(&mut data as *mut T as *mut u8, num_bytes);

        match self.read_exact(buffer) {
            Ok(()) => Ok(data),
            Err(e) => {
                forget(data);
                Err(e)
            }
        }
    }

    fn read_custom<T: CustomRead>(&mut self) -> Result<T> {
        T::read(self)
    }

    fn read_struct<T: StructRead>(&mut self) -> Result<T> {
        T::read(self)
    }

    fn read_buffer(&mut self, size: u64) -> Result<Vec<u8>> {
        let mut buffer = vec![0_u8; size as usize];
        self.read_exact(&mut buffer)?;

        Ok(buffer)
    }

    fn read_u8(&mut self) -> Result<u8> {
        let mut buffer = [0_u8; 1];
        self.read_exact(&mut buffer)?;

        Ok(u8::from_le_bytes(buffer))
    }

    fn read_u16(&mut self) -> Result<u16> {
        let mut buffer = [0_u8; 2];
        self.read_exact(&mut buffer)?;

        Ok(u16::from_le_bytes(buffer))
    }

    fn read_u32(&mut self) -> Result<u32> {
        let mut buffer = [0_u8; 4];
        self.read_exact(&mut buffer)?;

        Ok(u32::from_le_bytes(buffer))
    }

    fn read_u64(&mut self) -> Result<u64> {
        let mut buffer = [0_u8; 8];
        self.read_exact(&mut buffer)?;

        Ok(u64::from_le_bytes(buffer))
    }

    fn read_u8_be(&mut self) -> Result<u8> {
        let mut buffer = [0_u8; 1];
        self.read_exact(&mut buffer)?;

        Ok(u8::from_be_bytes(buffer))
    }

    fn read_u16_be(&mut self) -> Result<u16> {
        let mut buffer = [0_u8; 2];
        self.read_exact(&mut buffer)?;

        Ok(u16::from_be_bytes(buffer))
    }

    fn read_u32_be(&mut self) -> Result<u32> {
        let mut buffer = [0_u8; 4];
        self.read_exact(&mut buffer)?;

        Ok(u32::from_be_bytes(buffer))
    }

    fn read_u64_be(&mut self) -> Result<u64> {
        let mut buffer = [0_u8; 8];
        self.read_exact(&mut buffer)?;

        Ok(u64::from_be_bytes(buffer))
    }

    fn read_f32(&mut self) -> Result<f32> {
        let mut buffer = [0_u8; size_of::<f32>()];
        self.read_exact(&mut buffer)?;

        Ok(f32::from_le_bytes(buffer))
    }

    fn read_f64(&mut self) -> Result<f64> {
        let mut buffer = [0_u8; size_of::<f64>()];
        self.read_exact(&mut buffer)?;

        Ok(f64::from_le_bytes(buffer))
    }

    fn read_f32_be(&mut self) -> Result<f32> {
        let mut buffer = [0_u8; size_of::<f32>()];
        self.read_exact(&mut buffer)?;

        Ok(f32::from_be_bytes(buffer))
    }

    fn read_f64_be(&mut self) -> Result<f64> {
        let mut buffer = [0_u8; size_of::<f64>()];
        self.read_exact(&mut buffer)?;

        Ok(f64::from_be_bytes(buffer))
    }

    fn read_current_u8(&mut self) -> Result<u8> {
        let current = self.current_position()?;
        let result = self.read_u8()?;
        self.seek_start(current)?;
        Ok(result)
    }

    fn read_current_u16(&mut self) -> Result<u16> {
        let current = self.current_position()?;
        let result = self.read_u16()?;
        self.seek_start(current)?;
        Ok(result)
    }

    fn read_current_u32(&mut self) -> Result<u32> {
        let current = self.current_position()?;
        let result = self.read_u32()?;
        self.seek_start(current)?;
        Ok(result)
    }

    fn read_current_u64(&mut self) -> Result<u64> {
        let current = self.current_position()?;
        let result = self.read_u64()?;
        self.seek_start(current)?;
        Ok(result)
    }

    fn read_string_by_encoding(&mut self, encoding: &'static Encoding) -> Result<String> {
        let mut text: Vec<u8> = vec![];
        let mut end_of_string = false;

        while !end_of_string {
            let value = self.read_u8()?;
            end_of_string = value == 0;
            if !end_of_string {
                text.push(value);
            }
        }

        let (res, _enc, errors) = encoding.decode(&text);
        if errors {
            Ok("invalid text".to_string())
        } else {
            Ok(res.to_string())
        }
    }

    fn read_string_shift_jis(&mut self) -> Result<String> {
        self.read_string_by_encoding(SHIFT_JIS)
    }

    fn read_string_utf_8(&mut self) -> Result<String> {
        self.read_string_by_encoding(UTF_8)
    }
}
