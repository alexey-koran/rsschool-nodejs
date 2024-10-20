import { cp, rm } from 'node:fs/promises';
import { join } from 'node:path';

import { pathToFile, pathToNewDirectory } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../utils/validation.mjs';

const parameters = {
  mandatory: [pathToFile, pathToNewDirectory],
};

const help = {
  usage: getCommandUsage('mv', [...parameters.mandatory]),
  description: {
    text: 'Move file',
  },
};

const mv = async ({
  passedParameters: [_pathToFile, _pathToNewDirectory],
  currentWorkingDirectory,
}) => {
  const sourcePath = join(currentWorkingDirectory, _pathToFile);
  const destinationPath = join(currentWorkingDirectory, _pathToNewDirectory);

  await validatePath(sourcePath);
  await validatePath(destinationPath);

  await cp(sourcePath, destinationPath, {
    errorOnExist: true,
    force: false,
    recursive: true,
    preserveTimestamps: true,
  });

  await rm(sourcePath);
};

export default {
  func: mv,
  parameters,
  help,
};
