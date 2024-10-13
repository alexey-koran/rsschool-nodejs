import { readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const read = async () => {
  try {
    const fileContent = await readFile(`${currentFolderPath}/files/fileToRead.txt`, {
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
