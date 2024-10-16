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
