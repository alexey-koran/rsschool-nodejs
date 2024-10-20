import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';

const read = async () => {
  const currentDirname = import.meta.dirname;

  const input = createReadStream(`${currentDirname}/files/fileToRead.txt`);

  input.pipe(stdout);
};

await read();
