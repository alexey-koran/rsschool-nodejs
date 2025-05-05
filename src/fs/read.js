import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { messages } from '../constants.mjs';

const read = async () => {
  try {
    const fileContent = await readFile(join(import.meta.dirname, 'files', 'fileToRead.txt'), {
      encoding: 'utf8',
    });

    console.log(fileContent);
  } catch (error) {
    throw new Error(messages.error, { cause: error });
  }
};

await read();
