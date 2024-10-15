import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

import { validatePath } from '../utils.mjs';

export const hash = async ({ passedProps: pathToFile, currentWorkingDirectory }) => {
  const newPath = join(currentWorkingDirectory, pathToFile);

  await validatePath(newPath);

  const { createHash } = await import('node:crypto');

  const hash = createHash('sha256');

  const input = createReadStream(newPath);

  await pipeline(input, hash);

  const result = hash.digest('hex');

  console.debug(result);
};
