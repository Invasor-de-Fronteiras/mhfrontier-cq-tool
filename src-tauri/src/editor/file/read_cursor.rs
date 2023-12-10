use std::io::{Cursor, Read, Result, Seek, SeekFrom};
use std::mem::{forget, size_of, MaybeUninit};
use std::slice;

use encoding_rs::SHIFT_JIS;

pub trait CustomReader
where
    Self: Sized,
{
    fn read<W: ReadCursor + ?Sized>(reader: &mut W) -> Result<Self>;
}

pub trait ReadCursor
where
    Self: Read + Seek,
{
    fn seek_start(&mut self, pos: u64) -> Result<u64> {
        let result = self.seek(SeekFrom::Start(pos))?;

        Ok(result)
    }

    fn get_buffer(&mut self) -> Result<Vec<u8>> {
        let mut buffer = Vec::<u8>::new();
        self.read_to_end(&mut buffer)?;

        Ok(buffer)
    }

    /**
     * Função que le uma struct de um arquivo
     * T => struct que será usada para ler o arquivo
     */
    fn read_struct<T>(&mut self) -> std::io::Result<T> {
        // calculando o tamanho da struct em bytes
        let num_bytes = size_of::<T>();

        unsafe {
            // Aqui vamos criar uma instancia da nossa struct não inicializada
            // para fazer isso precisamos utilizar o escopo unsafe
            let mut data = MaybeUninit::<T>::uninit().assume_init();
            // Vamos criar um buffer dividindo nossa struct em um array de bytes
            // esse buffer é um espelho da nossa instancia, ou seja, eles compartilham o mesmo endereço na memória
            #[allow(unused_mut)]
            let mut buffer = slice::from_raw_parts_mut(&mut data as *mut T as *mut u8, num_bytes);

            // Depois de ler os bytes do arquivo para nosso buffer a nossa variavel data estava com os dados corretos
            match self.read_exact(buffer) {
                Ok(()) => Ok(data),
                Err(e) => {
                    forget(data);
                    Err(e)
                }
            }
        }
    }

    fn read_custom<T: CustomReader>(&mut self) -> std::io::Result<T> {
        T::read(self)
    }

    fn read_custom_buffer(&mut self, size: u64) -> std::io::Result<Vec<u8>> {
        let mut buffer = vec![0_u8; size as usize];
        self.read_exact(&mut buffer)?;

        Ok(buffer)
    }

    fn read_u32(&mut self) -> std::io::Result<u32> {
        let mut buffer = [0_u8; 4];
        self.read_exact(&mut buffer)?;

        Ok(u32::from_le_bytes(buffer))
    }

    fn read_u16(&mut self) -> std::io::Result<u16> {
        let mut buffer = [0_u8; 2];
        self.read_exact(&mut buffer)?;

        Ok(u16::from_le_bytes(buffer))
    }

    fn read_u16_be(&mut self) -> std::io::Result<u16> {
        let mut buffer = [0_u8; 2];
        self.read_exact(&mut buffer)?;

        Ok(u16::from_be_bytes(buffer))
    }

    fn read_u8(&mut self) -> std::io::Result<u8> {
        let mut buffer = [0_u8; 1];
        self.read_exact(&mut buffer)?;

        Ok(u8::from_le_bytes(buffer))
    }

    fn read_f32(&mut self) -> std::io::Result<f32> {
        let mut buffer = [0_u8; size_of::<f32>()];
        self.read_exact(&mut buffer)?;

        Ok(f32::from_le_bytes(buffer))
    }

    fn current_position(&mut self) -> std::io::Result<u64> {
        self.stream_position()
    }

    fn read_current_u8(&mut self) -> std::io::Result<u8> {
        let current = self.stream_position()?;
        let result = self.read_u8()?;
        self.seek_start(current)?;
        Ok(result)
    }

    fn read_current_u16(&mut self) -> std::io::Result<u16> {
        let current = self.stream_position()?;
        let result = self.read_u16()?;
        self.seek_start(current)?;
        Ok(result)
    }

    fn read_current_u32(&mut self) -> std::io::Result<u32> {
        let current = self.stream_position()?;
        let result = self.read_u32()?;
        self.seek_start(current)?;
        Ok(result)
    }

    fn read_string(&mut self) -> std::io::Result<String> {
        let mut text: Vec<u8> = vec![];
        let mut end_of_string = false;

        while !end_of_string {
            let value = self.read_u8()?;
            end_of_string = value == 0;
            if !end_of_string {
                text.push(value);
            }
        }

        let (res, _enc, errors) = SHIFT_JIS.decode(&text);
        if errors {
            Ok("invalid text".to_string())
        } else {
            Ok(res.to_string())
        }
    }
}

impl ReadCursor for Cursor<Vec<u8>> {}
