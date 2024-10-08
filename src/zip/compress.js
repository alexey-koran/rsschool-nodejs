import { createReadStream, createWriteStream } from 'node:fs';
import { dirname } from 'node:path';
import { pipeline } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { createGzip } from 'node:zlib';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const compress = async () => {
  try {
    const gzip = createGzip();

    const source = createReadStream(`${currentFolderPath}/files/fileToCompress.txt`);
    const destination = createWriteStream(`${currentFolderPath}/files/archive.gz`);

    const pipe = promisify(pipeline);
    await pipe(source, gzip, destination);
  } catch (error) {
    throw new Error(error);
  }
};

await compress();
