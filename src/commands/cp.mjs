import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

import { validatePath } from '../utils/validation.mjs';

export const cp = async ({ passedProps, currentWorkingDirectory }) => {
  const pathToFile = passedProps[0];
  const pathToNewDirectory = passedProps[1];

  const sourcePath = join(currentWorkingDirectory, pathToFile);
  const destinationPath = join(currentWorkingDirectory, pathToNewDirectory);

  await validatePath(sourcePath);
  await validatePath(destinationPath);

  const sourceStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  await pipeline(sourceStream, destinationStream);
};
