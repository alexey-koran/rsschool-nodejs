import { writeFile } from 'node:fs/promises';

export const add = async ({ passedProps, currentWorkingDirectory }) => {
  const fileName = passedProps[0];

  await writeFile(`${currentWorkingDirectory}/${fileName}`, '', { flag: 'wx' });
};
