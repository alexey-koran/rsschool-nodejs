import { rm } from 'node:fs/promises';

const remove = async () => {
  try {
    await rm(`${import.meta.dirname}/files/fileToRemove.txt`);
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await remove();
