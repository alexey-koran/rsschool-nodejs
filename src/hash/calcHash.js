import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';
import { messages } from '../constants.mjs';

const calculateHash = async () => {
  const { createHash } = await import('node:crypto');

  const hash = createHash('sha256');

  const input = createReadStream(
    join(import.meta.dirname, 'files', 'fileToCalculateHashFor.txt'),
  );

  await pipeline(input, hash);

  console.log(hash.digest('hex'));
};

await calculateHash();
