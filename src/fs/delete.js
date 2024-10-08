import { rm } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const remove = async () => {
  try {
    await rm(`${currentFolderPath}/files/fileToRemove.txt`);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    throw new Error(error);
  }
};

await remove();
