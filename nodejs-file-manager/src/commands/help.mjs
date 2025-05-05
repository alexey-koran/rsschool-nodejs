import { commandName } from '../parameters/index.mjs';
import { getCommandUsage } from '../utils/commandUsage.mjs';
import { parseHelpObj } from '../utils/help.mjs';

const parameters = {
  optional: [commandName],
};

const helpDesc = {
  usage: 'help',
  parameters: {
    commandName: {
      usage: getCommandUsage('help', [...parameters.optional]),
      description: {
        text: 'Display command description',
      },
    },
  },
  description: {
    text: 'Display program commands, their options and descriptions',
  },
};

const helpCommand = ({ passedParameters: [_commandName] = [], commandsHelp }) => {
  if (!_commandName?.length) {
    const helpArr = parseHelpObj(commandsHelp);

    console.debug(helpArr);
  } else if (_commandName?.length && commandsHelp[_commandName]) {
    const helpArr = parseHelpObj({ [`${_commandName}`]: commandsHelp[_commandName] });

    console.debug(helpArr);
  } else {
    throw new Error('Description for provided command not found.');
  }
};

export default {
  func: helpCommand,
  help: helpDesc,
  parameters,
};
