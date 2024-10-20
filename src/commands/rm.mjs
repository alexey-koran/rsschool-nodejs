import { rm as fsRm } from 'node:fs/promises';
import { join } from 'node:path';

import { pathToFile } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../utils/validation.mjs';

const parameters = {
  mandatory: [pathToFile],
};

const help = {
  usage: getCommandUsage('rm', [...parameters.mandatory]),
  description: {
    text: 'Delete file',
  },
};

const rm = async ({ passedParameters: [_pathToFile], currentWorkingDirectory }) => {
  const newPath = join(currentWorkingDirectory, _pathToFile);

  await validatePath(newPath);

  await fsRm(newPath);
};

export default {
  func: rm,
  parameters,
  help,
};
