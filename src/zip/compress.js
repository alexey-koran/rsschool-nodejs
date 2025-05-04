import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';
import { join } from 'node:path';
import { messages } from '../constants.mjs';

const compress = async () => {
  try {
    const gzip = createGzip();

    const source = createReadStream(
      join(import.meta.dirname, 'files', 'fileToCompress.txt'),
    );
    const destination = createWriteStream(
      join(import.meta.dirname, 'files', 'archive.gz'),
    );

    await pipeline(source, gzip, destination);
  } catch (error) {
    throw new Error(messages.error, { cause: error });
  }
};

await compress();
