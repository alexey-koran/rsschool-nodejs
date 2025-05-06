import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'node:zlib';

import { pathToFile, pathToDestination } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../validation/index.mjs';
import { getPath } from '../validation/path.mjs';

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
  const sourcePath = getPath({ path: _pathToFile, currentWorkingDirectory });
  const destinationPath = getPath({ path: _pathToDestination, currentWorkingDirectory });

  await validatePath(sourcePath);
  await validatePath(destinationPath);

  const brotliCompress = createBrotliCompress();

  const sourceStream = createReadStream(sourcePath);

  await pipeline(sourceStream, brotliCompress);

  const destinationStream = createWriteStream(destinationPath);

  await pipeline(brotliCompress, destinationStream);
};

export default {
  func: compress,
  parameters,
  help,
};
