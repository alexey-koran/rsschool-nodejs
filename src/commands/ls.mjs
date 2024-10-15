import { readdir } from 'node:fs/promises';

export const ls = async ({ currentWorkingDirectory }) => {
  const dirList = await readdir(currentWorkingDirectory, { withFileTypes: true });

  const tableList = dirList.map((element) => {
    return {
      name: element.name,
      type: element.isDirectory() ? 'directory' : 'file',
    };
  });

  console.table(tableList.sort((a, b) => (a.type > b.type ? 1 : -1)));
};
