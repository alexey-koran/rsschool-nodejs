import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

const compress = async () => {
  try {
    const currentDirname = import.meta.dirname;

    const gzip = createGzip();

    const source = createReadStream(`${currentDirname}/files/fileToCompress.txt`);
    const destination = createWriteStream(`${currentDirname}/files/archive.gz`);

    await pipeline(source, gzip, destination);
  } catch (error) {
    throw new Error(error);
  }
};

await compress();
