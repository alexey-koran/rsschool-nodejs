import { homedir } from 'node:os';
import { join } from 'node:path';

import { programErrors } from '../messages.mjs';
import { validatePath } from '../utils.mjs';

export const cd = async ({
  passedProps: pathToDirectory,
  currentWorkingDirectory,
  changeCurrentWorkingDirectory,
}) => {
  const newPath = join(currentWorkingDirectory, pathToDirectory);
  const homeDir = homedir();

  if (!newPath.startsWith(homeDir)) {
    throw new Error(programErrors.outOfRootDirectory);
  }

  await validatePath(newPath);

  changeCurrentWorkingDirectory(newPath);

  return newPath;
};
