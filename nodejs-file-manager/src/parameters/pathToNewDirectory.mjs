import { parametersNames, parametersTypes } from './constants/index.mjs';

export const pathToNewDirectory = {
  name: parametersNames.pathToNewDirectory,
  type: parametersTypes.directoryPath,
  description: {
    text: 'Path to new directory',
    usage: '<path_to_new_directory>',
  },
};
