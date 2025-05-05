import { programErrors } from '../messages.mjs';

export const validateOptionsAndParameters = async ({
  command,
  passedOptions = [],
  passedParameters = [],
  options = {},
  parameters = {},
}) => {
  const { mandatory, optional } = parameters;

  if (!options && passedOptions?.length) {
    throw new Error(`${programErrors.invalidInput}\n${command} ${programErrors.notSupportOptions}`);
  }

  const totalCount = mandatory?.length + optional?.length;

  if (passedParameters?.length > totalCount) {
    throw new Error(`${programErrors.invalidInput}\n${programErrors.tooMuchArguments}`);
  }

  if (mandatory?.length && !passedParameters?.length) {
    const mandatoryFields = mandatory
      .map((field) => field.description.text)
      .join(', ')
      .trim();

    throw new Error(
      `${programErrors.invalidInput}\n${mandatoryFields} ${programErrors.notSpecified}`,
    );
  } else if (mandatory?.length && passedParameters?.length < mandatory?.length) {
    const notSpecifiedMandatoryFields = mandatory.slice(passedParameters?.length);

    const mandatoryFields = notSpecifiedMandatoryFields
      .map((field) => field.description.text)
      .join(', ')
      .trim();

    throw new Error(
      `${programErrors.invalidInput}\n${mandatoryFields} ${programErrors.notSpecified}`,
    );
  }
};
