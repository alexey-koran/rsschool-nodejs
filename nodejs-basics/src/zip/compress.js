import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

import { messages } from '../constants.mjs';

const compress = async () => {
  try {
    const gzip = createGzip();

    const source = createReadStream(join(import.meta.dirname, 'files', 'fileToCompress.txt'));

    await pipeline(source, gzip);

    const destination = createWriteStream(join(import.meta.dirname, 'files', 'archive.gz'));

    await pipeline(gzip, destination);

    console.log(messages.success, messages.zip.compress);
  } catch (error) {
    throw new Error(messages.error, { cause: error });
  }
};

await compress();
