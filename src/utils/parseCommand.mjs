const splitProps = (props) => props.split(' ');

export const parseCommand = (line) => {
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
