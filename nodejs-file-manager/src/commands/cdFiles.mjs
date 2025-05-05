import { join } from 'node:path';

import { validatePath } from '../validation/index.mjs';

const help = {
  usage: 'cdFiles',
  description: {
    text: 'Go to test files folder: rsschool-nodejs/src/files',
  },
};

const cdFiles = async ({ changeCurrentWorkingDirectory }) => {
  const newPath = join(import.meta.dirname, '..', 'files');

  await validatePath(newPath, { checkPath: true });

  changeCurrentWorkingDirectory(newPath);

  return newPath;
};

export default {
  func: cdFiles,
  help,
};
