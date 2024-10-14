import { exit } from 'node:process';

import { programErrors } from './messages.mjs';

const getUsernameArgument = (argv) => argv.filter((argument) => argument.includes('--username='));

export const getUsername = (argv) => {
  const usernameArgument = getUsernameArgument(argv)[0];

  if (usernameArgument) {
    const username = usernameArgument.slice(usernameArgument.indexOf('=') + 1);

    if (username.length > 0) {
      return username;
    }
  }

  console.error(programErrors.usernameNotFound);

  exit(0);
};
