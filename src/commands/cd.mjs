import { access, constants } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { programErrors } from '../messages.mjs';

export const cd = async ({
  properties: pathToDirectory,
  currentWorkingDirectory,
  changeCurrentWorkingDirectory,
}) => {
  const newPath = join(currentWorkingDirectory, pathToDirectory);
  const homeDir = homedir();

  if (!newPath.startsWith(homeDir)) {
    throw new Error(`${programErrors.invalidInput}. You can't go upper than root directory.`);
  }

  try {
    await access(newPath, constants.F_OK);
  } catch (error) {
    throw new Error(`${programErrors.invalidInput}. ${error?.message}`);
  }

  changeCurrentWorkingDirectory(newPath);

  return newPath;
};
