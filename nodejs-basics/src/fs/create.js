import { writeFile } from 'node:fs/promises';

const fileContent = 'I am fresh and young';

const create = async () => {
  try {
    const currentDirname = import.meta.dirname;

    await writeFile(`${currentDirname}/files/fresh.txt`, fileContent, { flag: 'wx' });
  } catch (_error) {
    throw new Error('FS operation failed');
  }
};

await create();
