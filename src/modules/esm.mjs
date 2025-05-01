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

console.debug(`Release ${release()}`);
console.debug(`Version ${version()}`);
console.debug(`Path segment separator is "${sep}"`);

console.debug(`Path to current file is ${currentFileName}`);
console.debug(`Path to current directory is ${currentDirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.debug({ default: unknownObject.default });

myServer.listen(PORT, () => {
  console.debug(`Server is listening on port ${PORT}`);
  console.debug('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
