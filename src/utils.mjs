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

export const parseLine = (line) => {
  const trimmedLine = line.trim();

  const hasParams = trimmedLine.includes(' ');

  if (hasParams) {
    const command = trimmedLine.slice(0, trimmedLine.indexOf(' '));

    const flags = trimmedLine.match(/--\w*\s?/g);

    if (flags && flags.length > 0) {
      const properties = flags?.reduce(
        (acc, curr) => acc.replace(curr, ''),
        trimmedLine.slice(trimmedLine.indexOf(' ') + 1),
      );

      return {
        command,
        properties,
        flags,
      };
    }

    return {
      command,
      flags,
      properties: trimmedLine.slice(trimmedLine.indexOf(' ') + 1),
    };
  }

  return {
    command: trimmedLine,
    properties: null,
    flags: null,
  };
};
