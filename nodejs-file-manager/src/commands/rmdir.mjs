import { stat, rm as fsRm } from 'node:fs/promises';
import { EOL } from 'node:os';

import { programErrors } from '../messages.mjs';
import { pathToDirectory } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { validatePath } from '../validation/index.mjs';
import { getPath } from '../validation/path.mjs';

const parameters = {
  mandatory: [pathToDirectory],
};

const help = {
  usage: getCommandUsage('rmdir', [...parameters.mandatory]),
  description: {
    text: 'Delete directory',
  },
};

const rmdir = async ({ passedParameters: [_pathToDirectory], currentWorkingDirectory }) => {
  const newPath = getPath({ path: _pathToDirectory, currentWorkingDirectory });

  await validatePath(newPath);

  const stats = await stat(newPath);

  if (!stats.isDirectory()) {
    throw new Error(
      `${EOL}${programErrors.invalidInput}${EOL}${programErrors.notADirectory}${EOL}`,
    );
  }

  await fsRm(newPath, { recursive: true });
};

export default {
  func: rmdir,
  parameters,
  help,
};
