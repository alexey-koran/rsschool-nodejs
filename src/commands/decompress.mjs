import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress } from 'node:zlib';

import { validatePath } from '../utils/validation.mjs';

export const decompress = async ({ passedProps, currentWorkingDirectory }) => {
  const pathToFile = passedProps[0];
  const pathToDestination = passedProps[1];

  const sourcePath = join(currentWorkingDirectory, pathToFile);
  const destinationPath = join(currentWorkingDirectory, pathToDestination);

  await validatePath(sourcePath);
  await validatePath(destinationPath);

  const brotliDecompress = createBrotliDecompress();

  const sourceStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  await pipeline(sourceStream, brotliDecompress, destinationStream);
};
