import { argv, stdout, stdin, exit } from 'node:process';

const args = argv.slice(2);

console.debug(`Total number of arguments is ${args.length}`);
console.debug(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();

  if (chunkStringified.includes('CLOSE')) {
    exit(0);
  }

  stdout.write(`Received from master process: ${chunk.toString()}`);
};

stdin.on('data', echoInput);
