import { cp } from 'node:fs/promises';

const copy = async () => {
  try {
    await cp(`${import.meta.dirname}/files`, `${import.meta.dirname}/files_copy`, {
      errorOnExist: true,
      force: false,
      recursive: true,
    });
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await copy();
