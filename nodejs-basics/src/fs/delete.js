import { rm } from 'node:fs/promises';

const remove = async () => {
  try {
    const currentDirname = import.meta.dirname;

    await rm(`${currentDirname}/files/fileToRemove.txt`);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    throw new Error(error);
  }
};

await remove();
