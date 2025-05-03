import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const read = async () => {
  try {
    const fileContent = await readFile(
      join(import.meta.dirname, 'files', 'fileToRead.txt'),
      {
        encoding: 'utf8',
      },
    );

    console.log(fileContent);
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await read();
