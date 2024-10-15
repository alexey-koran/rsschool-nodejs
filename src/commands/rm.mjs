import { rm as fsRm } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { programErrors } from '../messages.mjs';
import { validatePath } from '../utils.mjs';

export const rm = async ({ passedProps: pathToFile, currentWorkingDirectory }) => {
  const newPath = join(currentWorkingDirectory, pathToFile);
  const homeDir = homedir();

  if (!newPath.startsWith(homeDir)) {
    throw new Error(programErrors.outOfRootDirectory);
  }

  await validatePath(newPath);

  await fsRm(newPath);
};
