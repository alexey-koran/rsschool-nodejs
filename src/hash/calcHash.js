import { createReadStream } from 'node:fs';
import { dirname } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

const calculateHash = async () => {
  const { createHash } = await import('node:crypto');

  const filePath = fileURLToPath(import.meta.url);
  const currentFolderPath = dirname(filePath);

  const hash = createHash('sha256');

  const input = createReadStream(`${currentFolderPath}/files/fileToCalculateHashFor.txt`);

  input.pipe(hash).setEncoding('hex').pipe(stdout);
};

await calculateHash();
