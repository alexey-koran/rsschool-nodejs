import { access, constants } from 'node:fs/promises';
import { homedir } from 'node:os';

import { programErrors } from '../messages.mjs';

const checkPath = async (path) => {
  try {
    await access(path, constants.F_OK);
  } catch (error) {
    throw new Error(`${programErrors.invalidInput} ${error?.message}`);
  }
};

export const validatePath = async (path, options = { checkPath: false }) => {
  const homeDir = homedir();

  if (!path.startsWith(homeDir)) {
    throw new Error(programErrors.outOfRootDirectory);
  }

  if (options.checkPath) {
    await checkPath(path);
  }
};
