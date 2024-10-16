import { rename as fsRename } from 'node:fs/promises';
import { join } from 'node:path';

import { validatePath } from '../utils/validation.mjs';

export const rn = async ({ passedProps, currentWorkingDirectory }) => {
  const pathToFile = passedProps[0];
  const fileName = passedProps[1];

  const newFilePath = join(currentWorkingDirectory, pathToFile);

  await validatePath(newFilePath);

  await fsRename(newFilePath, fileName);
};
