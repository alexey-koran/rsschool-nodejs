const splitParameters = (parameters) => parameters.split(' ');

export const parseCommand = (line) => {
  const trimmedLine = line.trim();

  const hasOptionsOrParameters = trimmedLine.includes(' ');

  if (hasOptionsOrParameters) {
    const command = trimmedLine.slice(0, trimmedLine.indexOf(' '));

    const optionsAndParameters = trimmedLine.slice(trimmedLine.indexOf(' ') + 1);

    const options = optionsAndParameters.match(/--\w+/g);

    if (options?.length > 0) {
      const onlyParameters = options?.reduce(
        (acc, curr) => acc.replace(curr, ''),
        optionsAndParameters,
      );

      const passedParameters = splitParameters(onlyParameters);
      const passedOptions = options.map((option) => option.replace('--', ''));

      return {
        command,
        passedParameters,
        passedOptions,
      };
    }

    const passedParameters = splitParameters(optionsAndParameters);

    return {
      command,
      passedParameters,
    };
  }

  return {
    command: trimmedLine,
  };
};
