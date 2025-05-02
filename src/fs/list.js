import { readdir } from 'node:fs/promises';

const list = async () => {
  try {
    const list = await readdir(`${import.meta.dirname}/files`);
    console.log(list);
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await list();
