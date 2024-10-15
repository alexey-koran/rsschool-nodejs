import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { programErrors } from '../messages.mjs';

export const cat = async ({ properties: pathToFile, flags, currentWorkingDirectory }) => {
  if (flags && flags.length > 0) {
    throw new Error(`${programErrors.invalidInput}. \nCat command does not support flags.`);
  }

  if (!pathToFile || pathToFile.length === 0) {
    throw new Error(`${programErrors.invalidInput}. \nPath to file is not specified.`);
  }

  try {
    const fileContent = await readFile(join(currentWorkingDirectory, pathToFile), {
      encoding: 'utf8',
    });

    console.debug(fileContent);
  } catch (error) {
    throw new Error(`${programErrors.operationFailed}. \n${error}`);
  }
};
