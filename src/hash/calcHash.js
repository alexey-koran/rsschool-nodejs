import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';

const calculateHash = async () => {
  const { createHash } = await import('node:crypto');

  const currentDirname = import.meta.dirname;

  const hash = createHash('sha256');

  const input = createReadStream(`${currentDirname}/files/fileToCalculateHashFor.txt`);

  await pipeline(input, hash.digest('hex'), stdout);
};

await calculateHash();
