import { parametersNames, parametersTypes } from './constants/index.mjs';

export const newFileName = {
  name: parametersNames.newFileName,
  type: parametersTypes.fileName,
  description: {
    text: 'New file name',
    usage: '<new_file_name>',
  },
};
