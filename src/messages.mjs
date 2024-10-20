export const programErrors = {
  usernameNotFound: "Username argument wasn't found!",
  tryAgain: 'Please try again!',
  invalidInput: 'Invalid input',
  operationFailed: 'Operation failed',
  outOfRootDirectory: "You can't go upper than root directory",
  notSupportOptions: 'command does not support options',
  notSpecified: 'not specified',
  tooMuchArguments: 'Too much arguments',
  commandNotFound: 'Command not found',
};

const defaultMessages = {
  operationSuccessful: 'operation successful',
};

export const getProgramMessages = (username) => {
  const welcome = `Welcome to the File Manager, ${username}!\n`;
  const goodbye = `Thank you for using File Manager, ${username}, goodbye!\n`;

  return {
    ...defaultMessages,
    welcome,
    goodbye,
  };
};

export const printWelcomeUser = (programMessages) => {
  console.debug(programMessages.welcome);
};

export const printWorkingDirectory = (workingDirectory) => {
  console.debug(`You are currently in ${workingDirectory}\n`);
};
