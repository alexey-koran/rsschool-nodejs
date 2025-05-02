import { rename as fsRename, access, constants } from 'node:fs/promises';

const rename = async () => {
  try {
    const hasProperFile = await access(
      `${import.meta.dirname}/files/properFilename.md`,
      constants.R_OK | constants.W_OK,
    );

    if (hasProperFile === undefined) {
      throw new Error('FS operation failed', { cause: 'File not found or improperly defined' });
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw new Error('FS operation failed', { cause: error });
    }
  }

  try {
    await fsRename(
      `${import.meta.dirname}/files/wrongFilename.txt`,
      `${import.meta.dirname}/files/properFilename.md`,
    );
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await rename();
