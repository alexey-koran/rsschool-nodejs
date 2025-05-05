import { parametersNames, parametersTypes } from './constants/index.mjs';

export const commandName = {
  name: parametersNames.commandName,
  type: parametersTypes.command,
  description: {
    text: 'Command name',
    usage: '<command_name>',
  },
};
