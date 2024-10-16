import { access, constants } from 'node:fs/promises';
import { homedir } from 'node:os';

import { programErrors } from './messages.mjs';

export const validateFuncProps = async ({
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

export const prepareHelpArr = (helpObj) => {
  const helpKeys = Object.keys(helpObj);

  const helpArr = helpKeys.map((key) => {
    const property = helpObj[key];

    const {
      command,
      description: { text, hint },
      options,
    } = property;

    const isOptionsExists = options && Object.keys(options)?.length;

    return {
      key,
      command,
      description: text,
      ...(hint && { hint }),
      ...(isOptionsExists && { options }),
    };
  });

  return helpArr;
};
