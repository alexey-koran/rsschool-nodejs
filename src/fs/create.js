import { writeFile } from 'node:fs/promises';

const fileContent = 'I am fresh and young';

const create = async () => {
  try {
    await writeFile(`${import.meta.dirname}/files/fresh.txt`, fileContent, { flag: 'wx' });
  } catch (_error) {
    throw new Error('FS operation failed');
  }
};

await create();
