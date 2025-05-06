import { mkdir as _mkdir } from 'node:fs/promises';
import { join } from 'node:path';

import { pathToDirectory } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { getPath } from '../validation/path.mjs';

const parameters = {
  mandatory: [pathToDirectory],
};

const help = {
  usage: getCommandUsage('mkdir', [...parameters.mandatory]),
  description: {
    text: 'Create directory in current working directory',
  },
};

const mkdir = async ({ passedParameters: [_pathToDirectory], currentWorkingDirectory }) => {
  const newPath = getPath({ path: _pathToDirectory, currentWorkingDirectory });

  await _mkdir(join(currentWorkingDirectory, newPath));
};

export default {
  func: mkdir,
  parameters,
  help,
};
