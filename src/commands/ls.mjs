import { readdir } from 'node:fs/promises';

const help = {
  usage: 'ls',
  description: {
    text: 'Print in console list of all files and folders in current directory',
  },
};

const getFileType = (dirEnt) => {
  const found = [
    ['file', dirEnt.isFile()],
    ['directory', dirEnt.isDirectory()],
    ['block device', dirEnt.isBlockDevice()],
    ['character device', dirEnt.isCharacterDevice()],
    ['fifo', dirEnt.isFIFO()],
    ['socket', dirEnt.isSocket()],
    ['symbolic link', dirEnt.isSymbolicLink()],
  ].find(([, isTrue]) => isTrue);

  return found ? found[0] : 'unknown';
};

const typePriority = {
  directory: 0,
  file: 1,
  'symbolic link': 2,
  'block device': 3,
  'character device': 4,
  fifo: 5,
  socket: 6,
  unknown: 7,
};

const ls = async ({ currentWorkingDirectory }) => {
  const dirList = await readdir(currentWorkingDirectory, { withFileTypes: true });

  const tableList = dirList
    .map((element) => {
      const elementType = getFileType(element);

      return {
        name: element.name,
        type: elementType,
      };
    })
    .toSorted((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }

      return typePriority[a.type] - typePriority[b.type];
    });

  console.table(tableList);
};

export default {
  func: ls,
  help,
};
