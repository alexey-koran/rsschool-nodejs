import { createReadStream, createWriteStream } from 'node:fs';
import { dirname } from 'node:path';
import { pipeline } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { createUnzip } from 'node:zlib';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const decompress = async () => {
  try {
    const unGzip = createUnzip();

    const source = createReadStream(`${currentFolderPath}/files/archive.gz`);
    const destination = createWriteStream(`${currentFolderPath}/files/fileToCompress.txt`);

    const pipe = promisify(pipeline);
    await pipe(source, unGzip, destination);
  } catch (error) {
    throw new Error(error);
  }
};

await decompress();
