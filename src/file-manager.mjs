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

const handleCommand = async (command, properties, flags, programMessages) => {
  try {
    await commandsMap[command]({ properties, flags, programMessages });

    console.debug(`\n${command} ${programMessages.operationSuccessful}\n`);
  } catch (error) {
    console.error(error?.message);
  }

  printWorkingDirectory();
};

const startFileManager = async () => {
  const { programMessages } = initFileManager();

  const rl = createInterface({ input: stdin, output: stdout, prompt: '' });

  rl.on('line', async (line) => {
    const { command, properties, flags } = parseLine(line);

    if (commandsMap[command]) {
      await handleCommand(command, properties, flags, programMessages);
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
