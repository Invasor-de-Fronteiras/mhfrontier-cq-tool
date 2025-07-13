use std::io::{Read, Result, Seek, SeekFrom};

pub trait BetterSeek
where
    Self: Read + Seek,
{
    fn current_position(&mut self) -> Result<u64> {
        self.stream_position()
    }

    fn seek_start(&mut self, pos: u64) -> Result<u64> {
        let result = self.seek(SeekFrom::Start(pos))?;

        Ok(result)
    }

    fn seek_current(&mut self, mov: i64) -> Result<u64> {
        let result = self.seek(SeekFrom::Current(mov))?;

        Ok(result)
    }

    fn seek_end(&mut self, mov: i64) -> Result<u64> {
        let result = self.seek(SeekFrom::End(mov))?;

        Ok(result)
    }

    fn len(&mut self) -> Result<u64> {
        let current_prt = self.current_position()?;
        self.seek_end(0)?;
        let size = self.current_position()?;
        self.seek_start(current_prt)?;

        Ok(size)
    }
}
