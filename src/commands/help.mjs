import { commandsHelp } from '../help.mjs';
import { getHelpArray } from '../utils/help.mjs';

export const help = ({ passedProps }) => {
  const commandName = passedProps?.[0];
  const commandHelp = commandsHelp[commandName];

  if (!commandName?.length) {
    const helpArr = getHelpArray(commandsHelp);
    console.debug(helpArr);
  } else if (commandName?.length && commandHelp) {
    const helpArr = getHelpArray({ [`${commandName}`]: commandHelp });
    console.debug(helpArr);
  } else {
    throw new Error('Description for provided command not found');
  }
};
