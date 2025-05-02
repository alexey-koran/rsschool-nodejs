import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const calculateHash = async () => {
  const { createHash } = await import('node:crypto');

  const hash = createHash('sha256');

  const input = createReadStream(`${import.meta.dirname}/files/fileToCalculateHashFor.txt`);

  await pipeline(input, hash);

  console.log(hash.digest('hex'));
};

await calculateHash();
