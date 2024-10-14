import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
  const transformStream = new Transform({
    transform(buffer, encoding, next) {
      const reversed = buffer.toString().split('').reverse().join('');
      transformStream.push(`${reversed}\n\n`);
      next();
    },
  });

  await pipeline(stdin, transformStream, stdout);
};

await transform();
