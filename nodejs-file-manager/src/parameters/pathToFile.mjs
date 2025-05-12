import { parametersNames, parametersTypes } from './constants/index.mjs';

export const pathToFile = {
  name: parametersNames.pathToFile,
  type: parametersTypes.filePath,
  description: {
    text: 'Path to file',
    usage: '<path_to_file>',
  },
};
