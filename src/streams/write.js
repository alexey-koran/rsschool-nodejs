import { createWriteStream } from 'node:fs';
import { stdin } from 'node:process';
import { pipeline } from 'node:stream/promises';

const write = async () => {
  const writeableStream = createWriteStream(`${import.meta.dirname}/files/fileToWrite.txt`);

  await pipeline(stdin, writeableStream);
};

await write();
