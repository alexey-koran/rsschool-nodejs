import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';

const read = async () => {
  const currentDirname = import.meta.dirname;

  const input = createReadStream(`${currentDirname}/files/fileToRead.txt`);

  await pipeline(input, stdout);
};

await read();
