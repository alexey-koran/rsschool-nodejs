import { open } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const fileContent = 'I am fresh and young';

const create = async () => {
  let file;

  try {
    file = await open(`${currentFolderPath}/files/fresh.txt`, 'wx+');

    await file.write(fileContent);

    await file.close();
  } catch (_error) {
    throw new Error('FS operation failed');
  }
};

await create();
