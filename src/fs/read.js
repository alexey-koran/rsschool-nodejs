import { readFile } from 'node:fs/promises';

const read = async () => {
  try {
    const currentDirname = import.meta.dirname;

    const fileContent = await readFile(`${currentDirname}/files/fileToRead.txt`, {
      encoding: 'utf8',
    });

    console.log(fileContent);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    throw new Error(error);
  }
};

await read();
