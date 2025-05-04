import { createWriteStream } from 'node:fs';
import { stdin } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

const write = async () => {
  const writeableStream = createWriteStream(
    join(import.meta.dirname, 'files', 'fileToWrite.txt'),
  );

  await pipeline(stdin, writeableStream);
};

await write();
