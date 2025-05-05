import { rm } from 'node:fs/promises';
import { join } from 'node:path';

import { messages } from '../constants.mjs';

const remove = async () => {
  try {
    await rm(join(import.meta.dirname, 'files', 'fileToRemove.txt'));

    console.log(messages.success, messages.fs.remove);
  } catch (error) {
    throw new Error(messages.error, { cause: error });
  }
};

await remove();
