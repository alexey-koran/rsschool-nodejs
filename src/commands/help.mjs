import { commandsHelp } from '../help.mjs';
import { prepareHelpArr } from '../utils.mjs';

export const help = ({ passedProps }) => {
  const commandName = passedProps?.[0];
  const commandHelp = commandsHelp[commandName];

  if (!commandName?.length) {
    const helpArr = prepareHelpArr(commandsHelp);
    console.debug(helpArr);
  } else if (commandName?.length && commandHelp) {
    const helpArr = prepareHelpArr({ [`${commandName}`]: commandHelp });
    console.debug(helpArr);
  } else {
    throw new Error('Description for provided command not found');
  }
};
