import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createUnzip } from 'node:zlib';

import { messages } from '../constants.mjs';

const decompress = async () => {
  try {
    const unGzip = createUnzip();

    const source = createReadStream(join(import.meta.dirname, 'files', 'archive.gz'));

    await pipeline(source, unGzip);

    const destination = createWriteStream(join(import.meta.dirname, 'files', 'fileToCompress.txt'));

    await pipeline(unGzip, destination);

    console.log(messages.success, messages.zip.decompress);
  } catch (error) {
    throw new Error(messages.error, { cause: error });
  }
};

await decompress();
