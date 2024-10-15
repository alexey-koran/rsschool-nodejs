import { argv, stdin, stdout, exit } from 'node:process';
import { createInterface } from 'node:readline/promises';

import { commandsMap } from './commands/index.mjs';
import {
  getProgramMessages,
  printWorkingDirectory,
  printWelcomeUser,
  programErrors,
} from './messages.mjs';
import { getUsername } from './utils.mjs';

const initFileManager = () => {
  const currentUsername = getUsername(argv);

  const programMessages = getProgramMessages(currentUsername);

  printWelcomeUser(programMessages);

  printWorkingDirectory();

  return {
    programMessages,
    username: currentUsername,
  };
};

const handleCommand = async (command, programMessages) => {
  if (commandsMap[command]) {
    try {
      await commandsMap[command]();

      console.debug(`\n${command} ${programMessages.operationSuccessful}\n`);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error(programErrors.invalidInput);
  }

  printWorkingDirectory();
};

const startFileManager = async () => {
  const { programMessages } = initFileManager();

  const rl = createInterface({ input: stdin, output: stdout, prompt: '' });

  rl.on('line', async (command) => {
    await handleCommand(command, programMessages);
  });

  rl.on('SIGINT', () => {
    console.debug(`${programMessages.goodbye}`);

    exit(0);
  });
};

await startFileManager();
