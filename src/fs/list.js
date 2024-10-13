import { readdir } from 'node:fs/promises';

const list = async () => {
  try {
    const list = await readdir(`${import.meta.dirname}/files`);
    console.debug(list);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    throw new Error(error);
  }
};

await list();
