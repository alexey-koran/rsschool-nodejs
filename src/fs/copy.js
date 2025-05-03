import { cp } from 'node:fs/promises';
import { join } from 'node:path';

const copy = async () => {
  try {
    await cp(
      join(import.meta.dirname, 'files'),
      join(import.meta.dirname, 'files_copy'),
      {
        errorOnExist: true,
        force: false,
        recursive: true,
      },
    );
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await copy();
