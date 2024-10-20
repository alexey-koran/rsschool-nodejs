import { rename as fsRename } from 'node:fs/promises';
import { join } from 'node:path';

import { pathToFile, newFileName } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../validation/index.mjs';

const parameters = {
  mandatory: [pathToFile, newFileName],
};

const help = {
  usage: getCommandUsage('rn', [...parameters.mandatory]),
  description: {
    text: 'Rename file',
    hint: '(content will remain unchanged)',
  },
};

const rn = async ({ passedParameters: [_pathToFile, _fileName], currentWorkingDirectory }) => {
  const pathToFile = join(currentWorkingDirectory, _pathToFile);
  const newFilePath = join(currentWorkingDirectory, _fileName);

  await validatePath(pathToFile);
  await validatePath(newFilePath);

  await fsRename(pathToFile, newFilePath);
};

export default {
  func: rn,
  parameters,
  help,
};
