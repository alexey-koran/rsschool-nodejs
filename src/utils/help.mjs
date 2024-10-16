export const getHelpArray = (helpObj) => {
  const keys = Object.keys(helpObj);

  return keys.map((key) => {
    const property = helpObj[key];

    const {
      command,
      description: { text, hint },
      options,
    } = property;

    const hasOptions = options && Object.keys(options)?.length;
    const hasHint = hint?.length;

    return {
      key,
      command,
      description: text,
      ...(hasHint && { hint }),
      ...(hasOptions && { options }),
    };
  });
};
