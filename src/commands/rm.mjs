import { rm as fsRm } from 'node:fs/promises';
import { join } from 'node:path';

import { validatePath } from '../utils/validation.mjs';

export const rm = async ({ passedProps, currentWorkingDirectory }) => {
  const pathToFile = passedProps[0];

  const newPath = join(currentWorkingDirectory, pathToFile);

  await validatePath(newPath);

  await fsRm(newPath);
};
