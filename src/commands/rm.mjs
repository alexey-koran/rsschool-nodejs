import { rm as fsRm } from 'node:fs/promises';
import { join } from 'node:path';

import { validatePath } from '../utils.mjs';

export const rm = async ({ passedProps: pathToFile, currentWorkingDirectory }) => {
  const newPath = join(currentWorkingDirectory, pathToFile);

  await validatePath(newPath);

  await fsRm(newPath);
};
