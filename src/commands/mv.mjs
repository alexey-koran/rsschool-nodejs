import { cp, rm } from 'node:fs/promises';
import { join } from 'node:path';

import { validatePath } from '../utils/validation.mjs';

export const mv = async ({ passedProps, currentWorkingDirectory }) => {
  const pathToFile = passedProps[0];
  const pathToNewDirectory = passedProps[1];

  const sourcePath = join(currentWorkingDirectory, pathToFile);
  const destinationPath = join(currentWorkingDirectory, pathToNewDirectory);

  await validatePath(sourcePath);
  await validatePath(destinationPath);

  await cp(sourcePath, destinationPath, {
    errorOnExist: true,
    force: false,
    recursive: true,
    preserveTimestamps: true,
  });

  await rm(sourcePath);
};
