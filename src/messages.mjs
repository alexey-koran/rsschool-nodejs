export const programErrors = {
  usernameNotFound: "Username argument wasn't found! Please try again!",
  invalidInput: 'Invalid input',
  operationFailed: 'Operation failed',
};

export const getProgramMessages = (username) => {
  const welcome = `Welcome to the File Manager, ${username}!\n`;
  const goodbye = `Thank you for using File Manager, ${username}, goodbye!\n`;

  return {
    welcome,
    goodbye,
  };
};

export const printWelcomeUser = (programMessages) => {
  console.debug(programMessages.welcome);
};

export const printWorkingDirectory = () => {
  console.debug(`You are currently in ${import.meta.dirname}\n`);
};
