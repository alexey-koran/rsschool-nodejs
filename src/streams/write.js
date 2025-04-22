import { createWriteStream } from 'node:fs';
import { stdin } from 'node:process';
import { pipeline } from 'node:stream/promises';

const write = async () => {
  const currentDirname = import.meta.dirname;

  const writeableStream = createWriteStream(`${currentDirname}/files/fileToWrite.txt`);

  await pipeline(stdin, writeableStream);
};

await write();
