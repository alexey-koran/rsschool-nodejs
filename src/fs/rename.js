import { rename as fsRename, access, constants } from 'node:fs/promises';
import { join } from 'node:path';
import { messages } from '../constants.mjs';

const rename = async () => {
  try {
    const hasProperFile = await access(
      join(import.meta.dirname, 'files', 'properFilename.md'),
      constants.R_OK | constants.W_OK,
    );

    if (hasProperFile === undefined) {
      throw new Error(messages.error, { cause: messages.fileNotFound });
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw new Error(messages.error, { cause: error });
    }
  }

  try {
    await fsRename(
      join(import.meta.dirname, 'files', 'wrongFilename.txt'),
      join(import.meta.dirname, 'files', 'properFilename.md'),
    );

    console.log(messages.success, messages.fs.rename);
  } catch (error) {
    throw new Error(messages.error, { cause: error });
  }
};

await rename();
