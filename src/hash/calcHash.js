import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';

const calculateHash = async () => {
  const { createHash } = await import('node:crypto');

  const currentDirname = import.meta.dirname;

  const hash = createHash('sha256');

  const input = createReadStream(`${currentDirname}/files/fileToCalculateHashFor.txt`);

  input.pipe(hash).setEncoding('hex').pipe(stdout);
};

await calculateHash();
