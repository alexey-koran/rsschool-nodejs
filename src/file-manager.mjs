import { homedir } from 'node:os';
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
import { parseLine, validateFuncProps } from './utils.mjs';

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
  passedProps,
  passedFlags,
  programMessages,
  currentWorkingDirectory,
  changeCurrentWorkingDirectory,
}) => {
  const newWorkingDirectory = await commandsMap[command].func({
    passedProps,
    passedFlags,
    programMessages,
    currentWorkingDirectory,
    changeCurrentWorkingDirectory,
  });

  printWorkingDirectory(newWorkingDirectory || currentWorkingDirectory);
};

const startFileManager = async () => {
  let currentWorkingDirectory = homedir();

  const changeCurrentWorkingDirectory = (newWorkingDirectory) => {
    currentWorkingDirectory = newWorkingDirectory;
  };

  const { programMessages } = initFileManager(currentWorkingDirectory);

  const rl = createInterface({ input: stdin, output: stdout, prompt: '' });

  rl.on('line', async (line) => {
    const { command, passedProps, passedFlags } = parseLine(line);

    if (commandsMap[command]) {
      try {
        const { flags, mandatoryProperties, optionalProperties } = commandsMap[command];

        await validateFuncProps({
          flags,
          command,
          passedProps,
          passedFlags,
          mandatoryProperties,
          optionalProperties,
        });

        try {
          await handleCommand({
            command,
            passedProps,
            passedFlags,
            programMessages,
            currentWorkingDirectory,
            changeCurrentWorkingDirectory,
          });

          console.debug(`${command} ${programMessages.operationSuccessful}\n`);
        } catch (error) {
          console.error(`${programErrors.operationFailed}. \n${error?.message}`);
        }
      } catch (error) {
        console.error(error?.message);
      }
    } else {
      console.error(
        `${programErrors.invalidInput} ${programErrors.commandNotFound} ${programErrors.tryAgain}`,
      );
    }
  });

  rl.on('SIGINT', () => {
    console.debug(`${programMessages.goodbye}`);

    exit(0);
  });
};

await startFileManager();
