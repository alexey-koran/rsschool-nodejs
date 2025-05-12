import { rm as fsRm } from 'node:fs/promises';

import { pathToFile } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../validation/index.mjs';
import { getPath } from '../validation/path.mjs';

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
  const newPath = getPath({ path: _pathToFile, currentWorkingDirectory });

  await validatePath(newPath);

  await fsRm(newPath);
};

export default {
  func: rm,
  parameters,
  help,
};
