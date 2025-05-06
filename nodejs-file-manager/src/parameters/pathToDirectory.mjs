import { parametersNames, parametersTypes } from './constants/index.mjs';

export const pathToDirectory = {
  name: parametersNames.pathToDirectory,
  type: parametersTypes.directoryPath,
  description: {
    text: 'Path to directory',
    usage: '<path_to_directory>',
  },
};
