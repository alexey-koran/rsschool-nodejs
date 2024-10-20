import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'node:zlib';

import { pathToFile, pathToDestination } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../validation/index.mjs';

const parameters = {
  mandatory: [pathToFile, pathToDestination],
};

const help = {
  usage: getCommandUsage('compress', [...parameters.mandatory]),
  description: {
    text: 'Compress file',
  },
};

const compress = async ({
  passedParameters: [_pathToFile, _pathToDestination],
  currentWorkingDirectory,
}) => {
  const sourcePath = join(currentWorkingDirectory, _pathToFile);
  const destinationPath = join(currentWorkingDirectory, _pathToDestination);

  await validatePath(sourcePath);
  await validatePath(destinationPath);

  const brotliCompress = createBrotliCompress();

  const sourceStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  await pipeline(sourceStream, brotliCompress, destinationStream);
};

export default {
  func: compress,
  parameters,
  help,
};
