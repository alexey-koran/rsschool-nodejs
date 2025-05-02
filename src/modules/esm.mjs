import { createServer as createServerHttp } from 'node:http';
import { release, version } from 'node:os';
import { sep } from 'node:path';

await import('./files/c.cjs');

const random = Math.random();
const currentDirname = import.meta.dirname;
const currentFileName = import.meta.filename;

const unknownObject = await import(random > 0.5 ? './files/a.json' : './files/b.json', {
  with: { type: 'json' },
});

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${currentFileName}`);
console.log(`Path to current directory is ${currentDirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log({ default: unknownObject.default });

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
