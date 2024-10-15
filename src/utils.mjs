import { access, constants } from 'node:fs/promises';
import { homedir } from 'node:os';
import { exit } from 'node:process';

import { programErrors } from './messages.mjs';

const getUsernameArgument = (argv) => argv.filter((argument) => argument.includes('--username='));

export const getUsername = (argv) => {
  const usernameArgument = getUsernameArgument(argv)[0];

  if (usernameArgument) {
    const username = usernameArgument.slice(usernameArgument.indexOf('=') + 1);

    if (username?.length > 0) {
      return username;
    }
  }

  console.error(programErrors.usernameNotFound);

  exit(0);
};

const splitProps = (props) => props.split(' ');

export const parseLine = (line) => {
  const trimmedLine = line.trim();

  const hasParams = trimmedLine.includes(' ');

  if (hasParams) {
    const command = trimmedLine.slice(0, trimmedLine.indexOf(' '));

    const flagsAndProps = trimmedLine.slice(trimmedLine.indexOf(' ') + 1);

    const passedFlags = flagsAndProps.match(/--\w*\s?/g);

    if (passedFlags?.length > 0) {
      const propsWithoutFlags = passedFlags?.reduce(
        (acc, curr) => acc.replace(curr, ''),
        flagsAndProps,
      );

      const passedProps = splitProps(propsWithoutFlags);

      return {
        command,
        passedProps,
        passedFlags,
      };
    }

    const passedProps = splitProps(flagsAndProps);

    return {
      command,
      passedFlags,
      passedProps,
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
  if (!flags.support && passedFlags?.length > 0) {
    throw new Error(`${programErrors.invalidInput}\n${command} ${programErrors.notSupportFlags}`);
  }

  if (propertiesNames?.length > 0 && (!passedProps || passedProps?.length === 0)) {
    throw new Error(
      `${programErrors.invalidInput}\n${propertiesNames.join(', ').trim()} ${programErrors.notSpecified}`,
    );
  }

  if (passedProps?.length > propertiesNames?.length) {
    throw new Error(`${programErrors.invalidInput}\n${programErrors.tooMuchArguments}`);
  }
};

const pingPath = async (path) => {
  try {
    await access(path, constants.F_OK);
  } catch (error) {
    throw new Error(`${programErrors.invalidInput} ${error?.message}`);
  }
};

export const validatePath = async (path, options = { pingPath: false }) => {
  const homeDir = homedir();

  if (!path.startsWith(homeDir)) {
    throw new Error(programErrors.outOfRootDirectory);
  }

  if (options.pingPath) {
    await pingPath(path);
  }
};
