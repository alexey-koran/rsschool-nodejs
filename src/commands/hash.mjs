import { createReadStream } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

import { programErrors } from '../messages.mjs';

export const hash = async ({ passedProps: pathToFile, currentWorkingDirectory }) => {
  const newPath = join(currentWorkingDirectory, pathToFile);
  const homeDir = homedir();

  if (!newPath.startsWith(homeDir)) {
    throw new Error(programErrors.outOfRootDirectory);
  }

  const { createHash } = await import('node:crypto');

  const hash = createHash('sha256');

  const input = createReadStream(newPath);

  await pipeline(input, hash);

  const result = hash.digest('hex');

  console.debug(result);
};
