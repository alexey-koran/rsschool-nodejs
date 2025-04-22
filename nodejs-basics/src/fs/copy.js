import { cp } from 'node:fs/promises';

const copy = async () => {
  try {
    const currentDirname = import.meta.dirname;

    await cp(`${currentDirname}/files`, `${currentDirname}/files_copy`, {
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
