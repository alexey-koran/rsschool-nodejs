import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createUnzip } from 'node:zlib';

const decompress = async () => {
  try {
    const unGzip = createUnzip();

    const source = createReadStream(`${import.meta.dirname}/files/archive.gz`);
    const destination = createWriteStream(`${import.meta.dirname}/files/fileToCompress.txt`);

    await pipeline(source, unGzip, destination);
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await decompress();
