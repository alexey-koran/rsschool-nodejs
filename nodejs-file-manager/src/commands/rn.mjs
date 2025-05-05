import { rename as fsRename } from 'node:fs/promises';

import { pathToFile, newFileName } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../validation/index.mjs';
import { getPath } from '../validation/path.mjs';

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
  const pathToFile = getPath({ path: _pathToFile, currentWorkingDirectory });
  const newFilePath = getPath({ path: _fileName, currentWorkingDirectory });

  await validatePath(pathToFile);
  await validatePath(newFilePath);

  await fsRename(pathToFile, newFilePath);
};

export default {
  func: rn,
  parameters,
  help,
};
