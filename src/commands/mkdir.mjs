import { mkdir as _mkdir } from 'node:fs/promises';
import { join } from 'node:path';

import { pathToDirectory } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';

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
  await _mkdir(join(currentWorkingDirectory, _pathToDirectory));
};

export default {
  func: mkdir,
  parameters,
  help,
};
