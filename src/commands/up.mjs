import { join } from 'node:path';

import { validatePath } from '../utils/validation.mjs';

const help = {
  usage: 'up',
  description: {
    text: 'Go upper from current directory',
    hint: "(when you are in the root folder this operation shouldn't change working directory)",
  },
};

const up = async ({ currentWorkingDirectory, changeCurrentWorkingDirectory }) => {
  const newPath = join(currentWorkingDirectory, '..');

  await validatePath(newPath, { checkPath: true });

  changeCurrentWorkingDirectory(newPath);

  return newPath;
};

export default {
  func: up,
  help,
};
