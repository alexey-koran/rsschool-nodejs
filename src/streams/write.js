import { createWriteStream } from 'node:fs';
import { stdin } from 'node:process';

const write = async () => {
  const writeableStream = createWriteStream(`${import.meta.dirname}/files/fileToWrite.txt`);

  stdin.pipe(writeableStream);
};

await write();
