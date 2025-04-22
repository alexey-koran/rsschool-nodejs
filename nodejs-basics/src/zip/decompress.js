import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createUnzip } from 'node:zlib';

const decompress = async () => {
  try {
    const currentDirname = import.meta.dirname;

    const unGzip = createUnzip();

    const source = createReadStream(`${currentDirname}/files/archive.gz`);
    const destination = createWriteStream(`${currentDirname}/files/fileToCompress.txt`);

    await pipeline(source, unGzip, destination);
  } catch (error) {
    throw new Error(error);
  }
};

await decompress();
