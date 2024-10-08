import { createWriteStream } from 'node:fs';
import { dirname } from 'node:path';
import { stdin } from 'node:process';
import { fileURLToPath } from 'node:url';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const write = async () => {
  const writeableStream = createWriteStream(`${currentFolderPath}/files/fileToWrite.txt`);

  stdin.on('data', (data) => {
    writeableStream.write(data);
  });

  stdin.on('end', () => {
    writeableStream.end();
  });
};

await write();
