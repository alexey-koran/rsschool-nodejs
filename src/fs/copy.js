import { cp } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const copy = async () => {
  try {
    await cp(`${currentFolderPath}/files`, `${currentFolderPath}/files_copy`, {
      errorOnExist: true,
      force: false,
      recursive: true,
    });
  } catch (error) {
    if (error?.code === 'ERR_FS_CP_EEXIST' || error?.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    throw new Error(error);
  }
};

await copy();
