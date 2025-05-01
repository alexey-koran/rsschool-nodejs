import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { EOL } from 'node:os';

const transform = async () => {
  const transformStream = new Transform({
    transform(buffer, encoding, next) {
      const input = buffer.toString().trim();
      const reversed = input.split('').reverse().join('');
      transformStream.push(`${reversed}${EOL}`);
      next();
    },
  });

  await pipeline(stdin, transformStream, stdout);
};

await transform();
