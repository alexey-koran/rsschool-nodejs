import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const list = async () => {
  try {
    const list = await readdir(join(import.meta.dirname, 'files'));
    console.log(list);
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await list();
