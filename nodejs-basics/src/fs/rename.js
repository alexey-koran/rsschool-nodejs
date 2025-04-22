import { rename as fsRename, access, constants } from 'node:fs/promises';

const rename = async () => {
  const currentDirname = import.meta.dirname;

  try {
    const hasProperFile = await access(
      `${currentDirname}/files/properFilename.md`,
      constants.R_OK | constants.W_OK,
    );

    if (hasProperFile === undefined) {
      throw new Error('FS operation failed');
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw new Error(error);
    }
  }

  try {
    await fsRename(
      `${currentDirname}/files/wrongFilename.txt`,
      `${currentDirname}/files/properFilename.md`,
    );
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    throw new Error(error);
  }
};

await rename();
