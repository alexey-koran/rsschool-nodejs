import { rename as fsRename, access, constants } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const rename = async () => {
  try {
    const properFileExists = await access(
      `${currentFolderPath}/files/properFilename.md`,
      constants.R_OK | constants.W_OK,
    );

    if (properFileExists === undefined) {
      throw new Error('FS operation failed');
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw new Error(error);
    }
  }

  try {
    await fsRename(
      `${currentFolderPath}/files/wrongFilename.txt`,
      `${currentFolderPath}/files/properFilename.md`,
    );
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }

    throw new Error(error);
  }
};

await rename();
