export const getHelpMap = (commandsMap) =>
  Object.entries(commandsMap).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`${key}`]: value?.help,
    }),
    {},
  );

export const parseHelpObj = (helpObj) => {
  const keys = Object.keys(helpObj);

  return keys.map((key) => {
    const property = helpObj[key];

    const {
      usage,
      description: { text, hint },
      options,
      parameters,
    } = property;

    const hasOptions = options && Object.keys(options)?.length;
    const hasParameters = parameters && Object.keys(parameters)?.length;
    const hasHint = hint?.length;

    return {
      key,
      usage,
      description: text,
      ...(hasHint && { hint }),
      ...(hasOptions && { options }),
      ...(hasParameters && { parameters }),
    };
  });
};
