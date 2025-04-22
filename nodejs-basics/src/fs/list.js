import { readdir } from 'node:fs/promises';

const list = async () => {
  try {
    const currentDirname = import.meta.dirname;

    const list = await readdir(`${currentDirname}/files`);
    console.debug(list);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    throw new Error(error);
  }
};

await list();
