import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createUnzip } from 'node:zlib';
import { join } from 'node:path';

const decompress = async () => {
  try {
    const unGzip = createUnzip();

    const source = createReadStream(
      join(import.meta.dirname, 'files', 'archive.gz'),
    );
    const destination = createWriteStream(
      join(import.meta.dirname, 'files', 'fileToCompress.txt'),
    );

    await pipeline(source, unGzip, destination);
  } catch (error) {
    throw new Error('FS operation failed', { cause: error });
  }
};

await decompress();
