import { rename as fsRename } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { programErrors } from '../messages.mjs';

export const rn = async ({ passedProps: paths, currentWorkingDirectory }) => {
  const splitPaths = paths.split(' ');
  const pathToFile = splitPaths[0];
  const fileName = splitPaths[1];

  const newPath = join(currentWorkingDirectory, pathToFile);
  const newFileName = join(currentWorkingDirectory, fileName);
  const homeDir = homedir();

  if (!newPath.startsWith(homeDir)) {
    throw new Error(programErrors.outOfRootDirectory);
  }

  await fsRename(newPath, newFileName);
};
