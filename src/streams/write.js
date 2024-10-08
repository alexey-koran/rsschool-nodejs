import { createWriteStream } from 'node:fs';
import { dirname } from 'node:path';
import { stdin } from 'node:process';
import { fileURLToPath } from 'node:url';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const write = async () => {
  const writeableStream = createWriteStream(`${currentFolderPath}/files/fileToWrite.txt`);

  stdin.pipe(writeableStream);
};

await write();
