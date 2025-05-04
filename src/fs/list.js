import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { messages } from '../constants.mjs';

const list = async () => {
  try {
    const list = await readdir(join(import.meta.dirname, 'files'));

    console.log(list);
    console.log(messages.success, messages.fs.list);
  } catch (error) {
    throw new Error(messages.error, { cause: error });
  }
};

await list();
