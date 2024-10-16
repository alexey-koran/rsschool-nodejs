import { join } from 'node:path';

import { validatePath } from '../utils/validation.mjs';

export const cd = async ({
  passedProps,
  currentWorkingDirectory,
  changeCurrentWorkingDirectory,
}) => {
  const pathToDirectory = passedProps[0];

  const newPath = join(currentWorkingDirectory, pathToDirectory);

  await validatePath(newPath, { pingPath: true });

  changeCurrentWorkingDirectory(newPath);

  return newPath;
};
