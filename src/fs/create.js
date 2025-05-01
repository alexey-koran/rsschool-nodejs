import { writeFile } from 'node:fs/promises';

const fileContent = 'I am fresh and young';

const create = async () => {
  try {
    await writeFile(`${import.meta.dirname}/files/fresh.txt`, fileContent, { flag: 'wx' });
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await create();
