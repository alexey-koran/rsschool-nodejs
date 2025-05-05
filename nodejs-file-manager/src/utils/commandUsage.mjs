export const getCommandUsage = (commandName = '', parametersArray = []) =>
  parametersArray.reduce((acc, curr) => {
    const {
      description: { usage },
    } = curr;

    return `${acc} ${usage}`;
  }, commandName);
