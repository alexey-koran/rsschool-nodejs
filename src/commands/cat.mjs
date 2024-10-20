import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';

import { pathToFile } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../validation/index.mjs';

const parameters = {
  mandatory: [pathToFile],
};

const help = {
  usage: getCommandUsage('cat', [...parameters.mandatory]),
  description: {
    text: "Read file and print it's content in console",
  },
};

const cat = async ({ passedParameters: [_pathToFile], currentWorkingDirectory }) => {
  const filePath = join(currentWorkingDirectory, _pathToFile);

  await validatePath(filePath);

  const sourceStream = createReadStream(filePath);

  await pipeline(sourceStream, stdout, { end: false });
};

export default {
  func: cat,
  parameters,
  help,
};
