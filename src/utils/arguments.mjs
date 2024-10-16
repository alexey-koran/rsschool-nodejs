import { exit } from 'node:process';

import { programErrors } from '../messages.mjs';

const getUsernameArgument = (argv) =>
  argv.filter((argument) => argument.includes('--username='))?.[0];

export const getUsernameFromArgv = (argv) => {
  const usernameArgument = getUsernameArgument(argv);

  if (usernameArgument) {
    const username = usernameArgument.slice(usernameArgument.indexOf('=') + 1);

    if (username?.length > 0) {
      return username;
    }
  }

  console.error(`${programErrors.usernameNotFound} ${programErrors.tryAgain}`);

  exit(0);
};
