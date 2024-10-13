import { readFile } from 'node:fs/promises';

const read = async () => {
  try {
    const fileContent = await readFile(`${import.meta.dirname}/files/fileToRead.txt`, {
      encoding: 'utf8',
    });

    console.debug(fileContent);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    throw new Error(error);
  }
};

await read();
