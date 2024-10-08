import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';

const transform = async () => {
  const transformStream = new Transform({
    transform(buffer, encoding, next) {
      const reversed = buffer.toString().split('').reverse().join('');
      transformStream.push(`${reversed}\n\n`);
      next();
    },
  });

  stdin.pipe(transformStream).pipe(stdout);
};

await transform();
