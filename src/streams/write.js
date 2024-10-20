import { createWriteStream } from 'node:fs';
import { stdin } from 'node:process';

const write = async () => {
  const currentDirname = import.meta.dirname;

  const writeableStream = createWriteStream(`${currentDirname}/files/fileToWrite.txt`);

  stdin.pipe(writeableStream);
};

await write();
