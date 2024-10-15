import { readdir } from 'node:fs/promises';

export const ls = async ({ currentWorkingDirectory }) => {
  const dirList = await readdir(currentWorkingDirectory, { withFileTypes: true });

  const tableList = dirList.map((element) => {
    const elementType =
      (element.isDirectory() && 'directory') || (element.isFile() && 'file') || 'unknown';

    return {
      name: element.name,
      type: elementType,
    };
  });

  console.table(tableList.sort((a, b) => (a.type > b.type ? 1 : -1)));
};
