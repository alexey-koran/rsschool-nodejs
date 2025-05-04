import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { messages } from '../constants.mjs';

const fileContent = 'I am fresh and young';

const create = async () => {
  try {
    await writeFile(
      join(import.meta.dirname, 'files', 'fresh.txt'),
      fileContent,
      { flag: 'wx' },
    );

    console.log(messages.success, messages.fs.create);
  } catch (error) {
    throw new Error(messages.error, { cause: error });
  }
};

await create();
