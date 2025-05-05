import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const calculateHash = async () => {
  const hash = createHash('sha256');

  const input = createReadStream(
    join(import.meta.dirname, 'files', 'fileToCalculateHashFor.txt'),
  );

  await pipeline(input, hash);

  console.log(hash.digest('hex'));
};

await calculateHash();
