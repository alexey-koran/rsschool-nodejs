import { argv } from 'node:process';

const parseArgs = () => {
  const cliArguments = argv.slice(2);

  const resultStr = cliArguments
    .reduce((acc, curr, ind, arr) => {
      if (curr.startsWith('--')) {
        acc.push(`${curr.slice(2)} is ${arr[ind + 1]}`);
      }

      return acc;
    }, [])
    .join(', ');

  console.debug(resultStr);
};

parseArgs();
