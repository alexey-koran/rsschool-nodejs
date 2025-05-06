import { createReadStream } from 'node:fs';
import { EOL } from 'node:os';
import { stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';

import { pathToFile } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../validation/index.mjs';
import { getPath } from '../validation/path.mjs';

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
  const filePath = getPath({ path: _pathToFile, currentWorkingDirectory });

  await validatePath(filePath);

  const sourceStream = createReadStream(filePath);

  stdout.write(EOL);
  await pipeline(sourceStream, stdout, { end: false });
  stdout.write(EOL);
};

export default {
  func: cat,
  parameters,
  help,
};
