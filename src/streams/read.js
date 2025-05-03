import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

const read = async () => {
  const input = createReadStream(join(import.meta.dirname, 'files', 'fileToRead.txt'));

  await pipeline(input, stdout);
};

await read();
