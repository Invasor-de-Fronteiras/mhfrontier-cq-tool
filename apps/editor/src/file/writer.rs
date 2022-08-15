use std::fs::{File, OpenOptions};
use std::io::{Result, Seek, SeekFrom, Write};
use std::mem::{forget, size_of};
use std::path::Path;
use std::slice;

pub struct FileWriter {
    pub writer: File,
}

impl FileWriter {
    pub fn from_filename(filename: &str) -> Result<FileWriter> {
        let filename = Path::new(filename);

        let f = OpenOptions::new().read(true).write(true).open(filename)?;

        Ok(FileWriter { writer: f })
    }

    pub fn seek_start(&mut self, pos: u64) -> Result<u64> {
        let result = self.writer.seek(SeekFrom::Start(pos))?;

        Ok(result)
    }

    /**
     * Função que le uma struct de um arquivo
     * T => struct que será usada para ler o arquivo
     */
    pub fn write_struct<T>(&mut self, data: &mut T) -> std::io::Result<()> {
        // calculando o tamanho da struct em bytes
        let num_bytes = size_of::<T>();

        unsafe {
            // Vamos criar um buffer dividindo nossa struct em um array de bytes
            // esse buffer é um espelho da nossa instancia, ou seja, eles compartilham o mesmo endereço na memória
            #[allow(unused_mut)]
            let mut buffer = slice::from_raw_parts_mut(data as *mut T as *mut u8, num_bytes);

            // Depois de ler os bytes do arquivo para nosso buffer a nossa variavel data estava com os dados corretos
            match self.writer.write(buffer) {
                Ok(_) => Ok(()),
                Err(e) => {
                    forget(data);
                    Err(e)
                }
            }
        }
    }

    pub fn write_u32(&mut self, value: &u32) -> std::io::Result<usize> {
        let buffer = value.to_le_bytes();
        let result = self.writer.write(&buffer)?;

        Ok(result)
    }

    pub fn write_u16(&mut self, value: &u16) -> std::io::Result<()> {
        let mut buffer = value.to_le_bytes();
        self.writer.write(&mut buffer)?;

        Ok(())
    }

    pub fn write_u8(&mut self, value: &u8) -> std::io::Result<()> {
        let mut buffer = value.to_be_bytes();
        self.writer.write(&mut buffer)?;

        Ok(())
    }

    pub fn write_f32(&mut self, value: &f32) -> std::io::Result<()> {
        let mut buffer = value.to_le_bytes();
        self.writer.write(&mut buffer)?;

        Ok(())
    }
}
