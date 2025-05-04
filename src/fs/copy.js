import { cp } from 'node:fs/promises';
import { join } from 'node:path';
import { messages } from '../constants.mjs';

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

    console.log(messages.success, messages.fs.copy);
  } catch (error) {
    throw new Error(messages.error, { cause: error });
  }
};

await copy();
