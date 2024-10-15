import { writeFile } from 'node:fs/promises';

export const add = async ({ passedProps: newFileName, currentWorkingDirectory }) => {
  await writeFile(`${currentWorkingDirectory}/${newFileName}`, '', { flag: 'wx' });
};
