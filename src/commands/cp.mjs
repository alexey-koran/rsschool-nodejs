import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { pathToFile, pathToNewDirectory } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../validation/index.mjs';
import { getPath } from '../validation/path.mjs';

const parameters = {
  mandatory: [pathToFile, pathToNewDirectory],
};

const help = {
  usage: getCommandUsage('cp', [...parameters.mandatory]),
  description: {
    text: 'Copy file',
  },
};

const cp = async ({
  passedParameters: [_pathToFile, _pathToNewDirectory],
  currentWorkingDirectory,
}) => {
  const sourcePath = getPath({ path: _pathToFile, currentWorkingDirectory });
  const destinationPath = getPath({ path: _pathToNewDirectory, currentWorkingDirectory });

  await validatePath(sourcePath);
  await validatePath(destinationPath);

  const sourceStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  await pipeline(sourceStream, destinationStream);
};

export default {
  func: cp,
  parameters,
  help,
};
