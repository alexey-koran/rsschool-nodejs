import { access, constants } from 'node:fs/promises';
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

    const passedFlags = trimmedLine.match(/--\w*\s?/g);

    if (passedFlags && passedFlags.length > 0) {
      const passedProps = passedFlags?.reduce(
        (acc, curr) => acc.replace(curr, ''),
        trimmedLine.slice(trimmedLine.indexOf(' ') + 1),
      );

      return {
        command,
        passedProps,
        passedFlags,
      };
    }

    return {
      command,
      passedFlags,
      passedProps: trimmedLine.slice(trimmedLine.indexOf(' ') + 1),
    };
  }

  return {
    command: trimmedLine,
    passedProps: null,
    passedFlags: null,
  };
};

export const validateFuncProps = async ({
  flags,
  command,
  passedFlags,
  passedProps,
  propertiesNames,
}) => {
  if (!flags.supported && passedFlags && passedFlags?.length > 0) {
    throw new Error(`${programErrors.invalidInput}\n${command} ${programErrors.notSupportFlags}`);
  }

  if (propertiesNames?.length > 0 && (!passedProps || passedProps?.length === 0)) {
    throw new Error(
      `${programErrors.invalidInput}\n${propertiesNames.join(', ').trim()} ${programErrors.notSpecified}`,
    );
  }
};

export const validatePath = async (path) => {
  try {
    await access(path, constants.F_OK);
  } catch (error) {
    throw new Error(`${programErrors.invalidInput} ${error?.message}`);
  }
};
