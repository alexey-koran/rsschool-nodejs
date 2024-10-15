import { join } from 'node:path';

import { validatePath } from '../utils.mjs';

export const cd = async ({
  passedProps: pathToDirectory,
  currentWorkingDirectory,
  changeCurrentWorkingDirectory,
}) => {
  const newPath = join(currentWorkingDirectory, pathToDirectory);

  await validatePath(newPath, { pingPath: true });

  changeCurrentWorkingDirectory(newPath);

  return newPath;
};
