import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { open } from 'node:fs/promises';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const fileContent = 'I am fresh and young';

const create = async () => {
  let file;
  try {
    file = await open(`${currentFolderPath}/files/fresh.txt`, 'wx+');

    file.write(fileContent);

    file.close();
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await create();
