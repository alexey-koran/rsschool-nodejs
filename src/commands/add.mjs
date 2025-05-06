import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { newFileName } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { getPath } from '../validation/path.mjs';

const parameters = {
  mandatory: [newFileName],
};

const help = {
  usage: getCommandUsage('add', [...parameters.mandatory]),
  description: {
    text: 'Create empty file in current working directory',
  },
};

const add = async ({ passedParameters: [_fileName], currentWorkingDirectory }) => {
  const newPath = getPath({ path: _fileName, currentWorkingDirectory });

  await writeFile(join(currentWorkingDirectory, newPath), '', { flag: 'wx' });
};

export default {
  func: add,
  parameters,
  help,
};
