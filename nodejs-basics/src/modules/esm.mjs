import { createServer as createServerHttp } from 'node:http';
import { release, version } from 'node:os';
import { join, sep } from 'node:path';

await import(join(import.meta.dirname, 'files', 'c.cjs'));

const random = Math.random();

const unknownObject = await import(
  join(import.meta.dirname, 'files', random > 0.5 ? 'a.json' : 'b.json'),
  {
    with: { type: 'json' },
  }
);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${import.meta.filename}`);
console.log(`Path to current directory is ${import.meta.dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject.default);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
