import { createReadStream } from 'node:fs';
import { dirname } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

const read = async () => {
  const filePath = fileURLToPath(import.meta.url);
  const currentFolderPath = dirname(filePath);

  const input = createReadStream(`${currentFolderPath}/files/fileToRead.txt`);

  input.pipe(stdout);
};

await read();
