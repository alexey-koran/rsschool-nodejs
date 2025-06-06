import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { pathToFile } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../validation/index.mjs';
import { getPath } from '../validation/path.mjs';

const parameters = {
  mandatory: [pathToFile],
};

const help = {
  usage: getCommandUsage('hash', [...parameters.mandatory]),
  description: {
    text: 'Calculate hash for file and print it into console',
  },
};

const hash = async ({ passedParameters: [_pathToFile], currentWorkingDirectory }) => {
  const newPath = getPath({ path: _pathToFile, currentWorkingDirectory });

  await validatePath(newPath);

  const { createHash } = await import('node:crypto');

  const hash = createHash('sha256');

  const input = createReadStream(newPath);

  await pipeline(input, hash);

  const result = hash.digest('hex');

  console.debug(result);
};

export default {
  func: hash,
  parameters,
  help,
};
