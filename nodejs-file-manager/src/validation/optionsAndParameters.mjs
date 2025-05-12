import { defaultMessages, programErrors } from '../messages.mjs';
import { formatError } from '../utils/error.mjs';

const validateOptions = ({ command, options = {}, passedOptions = [] }) => {
  const definedOptionKeys = Object.keys(options);

  if (definedOptionKeys.length === 0 && passedOptions.length > 0) {
    throw new Error(
      formatError(programErrors.invalidInput, `${command} ${programErrors.notSupportOptions}`),
    );
  }

  const unknownOptions = passedOptions.filter((opt) => !definedOptionKeys.includes(opt));

  if (unknownOptions.length > 0) {
    throw new Error(
      formatError(
        programErrors.invalidInput,
        `${programErrors.unknownOptions} ${command}: ${unknownOptions.join(', ')}`,
        `${defaultMessages.supportedOptions}: ${definedOptionKeys.join(', ')}`,
      ),
    );
  }
};

const validateMandatoryParameters = ({ mandatory = [], passedParameters = [] }) => {
  const isMissing = mandatory.length > passedParameters.length;

  if (!isMissing) {
    return;
  }

  const missingFields = mandatory
    .slice(passedParameters.length)
    .map((field) => field.description.text)
    .join(', ')
    .trim();

  throw new Error(
    formatError(programErrors.invalidInput, `${missingFields} ${programErrors.notSpecified}`),
  );
};

export const validateOptionsAndParameters = async ({
  command,
  options = {},
  parameters = {},
  passedOptions = [],
  passedParameters = [],
}) => {
  validateOptions({ command, options, passedOptions });

  const { mandatory = [], optional = [] } = parameters;
  const totalExpected = mandatory.length + optional.length;

  if (passedParameters.length > totalExpected) {
    throw new Error(formatError(programErrors.invalidInput, programErrors.tooMuchArguments));
  }

  validateMandatoryParameters({ mandatory, passedParameters });
};
