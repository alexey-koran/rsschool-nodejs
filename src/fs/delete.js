import { rm } from 'node:fs/promises';
import { join } from 'node:path';

const remove = async () => {
  try {
    await rm(join(import.meta.dirname, 'files', 'fileToRemove.txt'));
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await remove();
