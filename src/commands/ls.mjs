import { readdir } from 'node:fs/promises';

const help = {
  usage: 'ls',
  description: {
    text: 'Print in console list of all files and folders in current directory',
  },
};

const ls = async ({ currentWorkingDirectory }) => {
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

export default {
  func: ls,
  help,
};
