import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress } from 'node:zlib';

import { pathToFile, pathToDestination } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../utils/validation.mjs';

const parameters = {
  mandatory: [pathToFile, pathToDestination],
};

const help = {
  usage: getCommandUsage('decompress', [...parameters.mandatory]),
  description: {
    text: 'Decompress file',
  },
};

const decompress = async ({
  passedParameters: [_pathToFile, _pathToDestination],
  currentWorkingDirectory,
}) => {
  const sourcePath = join(currentWorkingDirectory, _pathToFile);
  const destinationPath = join(currentWorkingDirectory, _pathToDestination);

  await validatePath(sourcePath);
  await validatePath(destinationPath);

  const brotliDecompress = createBrotliDecompress();

  const sourceStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  await pipeline(sourceStream, brotliDecompress, destinationStream);
};

export default {
  func: decompress,
  parameters,
  help,
};
