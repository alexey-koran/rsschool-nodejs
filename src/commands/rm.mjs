import { rm as fsRm } from 'node:fs/promises';

export const rm = async ({ passedProps: pathToFile }) => {
  await fsRm(pathToFile);
};
