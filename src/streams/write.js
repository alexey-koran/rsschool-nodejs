import { createWriteStream } from 'node:fs';
import { stdin } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';
import { messages } from '../constants.mjs';

const write = async () => {
  const writeableStream = createWriteStream(
    join(import.meta.dirname, 'files', 'fileToWrite.txt'),
  );

  await pipeline(stdin, writeableStream);

  console.log(messages.success, messages.streams.write);
};

await write();
