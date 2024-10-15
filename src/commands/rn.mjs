import { rename as fsRename } from 'node:fs/promises';
import { join } from 'node:path';

import { validatePath } from '../utils.mjs';

export const rn = async ({ passedProps: paths, currentWorkingDirectory }) => {
  const pathToFile = paths[0];
  const fileName = paths[1];

  const newFilePath = join(currentWorkingDirectory, pathToFile);

  await validatePath(newFilePath);

  await fsRename(newFilePath, fileName);
};
