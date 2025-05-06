import { homedir, EOL } from 'node:os';
import { argv, stdin, stdout, exit } from 'node:process';
import { createInterface } from 'node:readline/promises';

import { commandsMap } from './commands/index.mjs';
import {
  getProgramMessages,
  printWorkingDirectory,
  printWelcomeUser,
  programErrors,
} from './messages.mjs';
import { getUsernameFromArgv } from './utils/arguments.mjs';
import { getHelpMap } from './utils/help.mjs';
import { parseCommand } from './utils/parseCommand.mjs';
import { validateOptionsAndParameters } from './validation/index.mjs';

const initFileManager = (currentWorkingDirectory) => {
  const currentUsername = getUsernameFromArgv(argv);

  const programMessages = getProgramMessages(currentUsername);

  printWelcomeUser(programMessages);

  printWorkingDirectory(currentWorkingDirectory);

  return {
    programMessages,
    username: currentUsername,
  };
};

const handleCommand = async ({
  command,
  passedOptions,
  passedParameters,
  programMessages,
  currentWorkingDirectory,
  changeCurrentWorkingDirectory,
}) => {
  const currentCommand = commandsMap[command];

  let commandsHelp;
  const isHelpCommand = command === 'help';

  if (isHelpCommand) {
    commandsHelp = getHelpMap(commandsMap);
  }

  const newWorkingDirectory = await currentCommand.func({
    ...(isHelpCommand && { commandsHelp }),
    passedOptions,
    passedParameters,
    programMessages,
    currentWorkingDirectory,
    changeCurrentWorkingDirectory,
  });

  return newWorkingDirectory;
};

const startFileManager = async () => {
  let currentWorkingDirectory = homedir();

  const changeCurrentWorkingDirectory = (newWorkingDirectory) => {
    currentWorkingDirectory = newWorkingDirectory;
  };

  const { programMessages } = initFileManager(currentWorkingDirectory);

  const readLine = createInterface({ input: stdin, output: stdout, prompt: '' });

  readLine.on('line', async (line) => {
    const { command, passedParameters, passedOptions } = parseCommand(line);

    if (commandsMap[command]) {
      try {
        const { options, parameters } = commandsMap[command];

        await validateOptionsAndParameters({
          command,
          options,
          parameters,
          passedOptions,
          passedParameters,
        });

        try {
          const newWorkingDirectory = await handleCommand({
            command,
            passedOptions,
            passedParameters,
            programMessages,
            currentWorkingDirectory,
            changeCurrentWorkingDirectory,
          });

          console.debug(`${EOL}${command} ${programMessages.operationSuccessful}`);

          printWorkingDirectory(newWorkingDirectory || currentWorkingDirectory);
        } catch (error) {
          console.error(`${programErrors.operationFailed}${EOL}${error?.message}`);
        }
      } catch (error) {
        console.error(error?.message);
      }
    } else {
      console.error(
        `${EOL}${programErrors.invalidInput} ${programErrors.commandNotFound}${EOL}${programErrors.tryAgain}${EOL}`,
      );
    }
  });

  readLine.on('SIGINT', () => {
    console.debug(`${programMessages.goodbye}`);

    exit(0);
  });
};

await startFileManager();
