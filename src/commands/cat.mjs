import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { validatePath } from '../utils.mjs';

export const cat = async ({ passedProps: pathToFile, currentWorkingDirectory }) => {
  const newPath = join(currentWorkingDirectory, pathToFile);

  await validatePath(newPath);

  const fileContent = await readFile(newPath, {
    encoding: 'utf8',
  });

  console.debug(fileContent);
};
