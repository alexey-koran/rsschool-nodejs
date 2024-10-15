import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const cat = async ({ passedProps: pathToFile, currentWorkingDirectory }) => {
  const fileContent = await readFile(join(currentWorkingDirectory, pathToFile), {
    encoding: 'utf8',
  });

  console.debug(fileContent);
};
