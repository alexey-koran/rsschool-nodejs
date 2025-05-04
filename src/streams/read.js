import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';
import { messages } from '../constants.mjs';

const read = async () => {
  const input = createReadStream(join(import.meta.dirname, 'files', 'fileToRead.txt'));

  await pipeline(input, stdout);

  console.log(messages.success, messages.streams.read);
};

await read();
