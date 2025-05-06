import { parametersNames, parametersTypes } from './constants/index.mjs';

export const pathToDestination = {
  name: parametersNames.pathToDestination,
  type: parametersTypes.directoryPath,
  description: {
    text: 'Path to destination',
    usage: '<path_to_destination>',
  },
};
