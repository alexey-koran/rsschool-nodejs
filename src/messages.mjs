import { EOL } from 'node:os';

export const programErrors = {
  usernameNotFound: `Username argument not found.${EOL}Default username used.`,
  tryAgain: 'Please try again!',
  invalidInput: 'Invalid input.',
  operationFailed: 'Operation failed.',
  outOfRootDirectory: "You can't go upper than root directory.",
  notSupportOptions: 'command does not support options.',
  unknownOptions: 'Unknown options provided to command',
  notSpecified: 'not specified.',
  tooMuchArguments: 'Too much arguments.',
  commandNotFound: 'Command not found.',
};

export const defaultMessages = {
  operationSuccessful: 'operation successful.',
  supportedOptions: 'Supported options',
};

export const getProgramMessages = (username) => {
  const welcome = `Welcome to the File Manager, ${username}!`;
  const goodbye = `Thank you for using File Manager, ${username}, goodbye!`;

  return {
    welcome,
    goodbye,
  };
};

export const printWelcomeUser = (programMessages) => {
  console.debug(programMessages.welcome);
};

export const printWorkingDirectory = (workingDirectory) => {
  console.debug(`${EOL}You are currently in ${workingDirectory}${EOL}`);
};
