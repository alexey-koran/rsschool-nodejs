import { access, constants } from 'node:fs/promises';
import { homedir } from 'node:os';

import { programErrors } from '../messages.mjs';

export const validateProps = async ({
  flags,
  command,
  passedFlags,
  passedProps,
  mandatoryProperties,
  optionalProperties,
}) => {
  const passedFlagsCount = passedFlags?.length;
  const passedPropsCount = passedProps?.length;

  const mandatoryPropertiesCount = mandatoryProperties?.length;
  const optionalPropertiesCount = optionalProperties?.length;

  const totalPropertiesCount = mandatoryPropertiesCount + optionalPropertiesCount;

  const isSupportFlags = flags.support;

  if (!isSupportFlags && passedFlagsCount) {
    throw new Error(`${programErrors.invalidInput}\n${command} ${programErrors.notSupportFlags}`);
  }

  if (passedPropsCount > totalPropertiesCount) {
    throw new Error(`${programErrors.invalidInput}\n${programErrors.tooMuchArguments}`);
  }

  if (mandatoryPropertiesCount && !passedPropsCount) {
    throw new Error(
      `${programErrors.invalidInput}\n${mandatoryProperties.join(', ').trim()} ${programErrors.notSpecified}`,
    );
  } else if (mandatoryPropertiesCount && passedPropsCount < mandatoryPropertiesCount) {
    const notSpecifiedMandatoryFields = mandatoryProperties.slice(passedPropsCount);

    throw new Error(
      `${programErrors.invalidInput}\n${notSpecifiedMandatoryFields.join(', ').trim()} ${programErrors.notSpecified}`,
    );
  }
};

const checkPath = async (path) => {
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
    await checkPath(path);
  }
};
