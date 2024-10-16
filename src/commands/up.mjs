import { join } from 'node:path';

import { validatePath } from '../utils/validation.mjs';

export const up = async ({ currentWorkingDirectory, changeCurrentWorkingDirectory }) => {
  const newPath = join(currentWorkingDirectory, '..');

  await validatePath(newPath, { pingPath: true });

  changeCurrentWorkingDirectory(newPath);

  return newPath;
};
