import { argv } from 'node:process';

import { messages } from '../constants.mjs';

const cliArguments = argv.slice(2);

const parseArgs = () => {
  const resultStr = cliArguments
    .reduce((acc, curr, ind, arr) => {
      if (curr.startsWith('--')) {
        acc.push(`${curr.slice(2)} is ${arr[ind + 1]}`);
      }

      return acc;
    }, [])
    .join(', ');

  console.log(messages.cli.args, resultStr);
};

parseArgs();
