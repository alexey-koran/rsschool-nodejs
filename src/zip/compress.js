import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

const compress = async () => {
  try {
    const gzip = createGzip();

    const source = createReadStream(`${import.meta.dirname}/files/fileToCompress.txt`);
    const destination = createWriteStream(`${import.meta.dirname}/files/archive.gz`);

    await pipeline(source, gzip, destination);
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await compress();
