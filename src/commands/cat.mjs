import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { pathToFile } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../utils/validation.mjs';

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
  const newPath = join(currentWorkingDirectory, _pathToFile);

  await validatePath(newPath);

  const fileContent = await readFile(newPath, {
    encoding: 'utf8',
  });

  console.debug(fileContent);
};

export default {
  func: cat,
  parameters,
  help,
};
