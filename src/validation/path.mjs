import { access, constants } from 'node:fs/promises';
import { EOL, isAbsolute, join, resolve } from 'node:os';
import { parse } from 'node:path';
import { cwd } from 'node:process';

import { programErrors } from '../messages.mjs';

const checkPath = async (path) => {
  try {
    await access(path, constants.F_OK);
  } catch (error) {
    throw new Error(`${programErrors.invalidInput}${EOL}${error?.message}`);
  }
};

export const validatePath = async (path, options = { checkPath: false }) => {
  const rootDir = parse(cwd()).root;

  if (!path.startsWith(rootDir)) {
    throw new Error(`${programErrors.invalidInput}${EOL}${programErrors.outOfRootDirectory}`);
  }

  if (options.checkPath) {
    await checkPath(path);
  }
};

export const getPath = ({ path, currentWorkingDirectory }) => {
  if (isAbsolute(path)) {
    return resolve(path);
  }

  return join(currentWorkingDirectory, path);
};
