import { open } from 'node:fs/promises';

const fileContent = 'I am fresh and young';

const create = async () => {
  let file;

  try {
    file = await open(`${import.meta.dirname}/files/fresh.txt`, 'wx+');

    await file.write(fileContent);

    await file.close();
  } catch (_error) {
    throw new Error('FS operation failed');
  }
};

await create();
