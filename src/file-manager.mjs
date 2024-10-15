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
import { getUsername, parseLine } from './utils.mjs';

const initFileManager = (currentWorkingDirectory) => {
  const currentUsername = getUsername(argv);

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
  properties,
  flags,
  programMessages,
  currentWorkingDirectory,
  changeCurrentWorkingDirectory,
}) => {
  let newWorkingDirectory;

  try {
    newWorkingDirectory = await commandsMap[command]({
      properties,
      flags,
      programMessages,
      currentWorkingDirectory,
      changeCurrentWorkingDirectory,
    });

    console.debug(`\n${command} ${programMessages.operationSuccessful}\n`);
  } catch (error) {
    console.error(error?.message);
  }

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
    const { command, properties, flags } = parseLine(line);

    if (commandsMap[command]) {
      await handleCommand({
        command,
        properties,
        flags,
        programMessages,
        currentWorkingDirectory,
        changeCurrentWorkingDirectory,
      });
    } else {
      console.error(programErrors.invalidInput);
    }
  });

  rl.on('SIGINT', () => {
    console.debug(`${programMessages.goodbye}`);

    exit(0);
  });
};

await startFileManager();
