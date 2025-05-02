import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';

const read = async () => {
  const input = createReadStream(`${import.meta.dirname}/files/fileToRead.txt`);

  await pipeline(input, stdout);
};

await read();
