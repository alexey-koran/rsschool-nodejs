import { createServer as createServerHttp } from 'node:http';
import { release, version } from 'node:os';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

await import('./files/c.js');

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = await import('./files/a.json', { with: { type: 'json' } });
} else {
  unknownObject = await import('./files/b.json', { with: { type: 'json' } });
}

console.debug(`Release ${release()}`);
console.debug(`Version ${version()}`);
console.debug(`Path segment separator is "${path.sep}"`);

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

console.debug(`Path to current file is ${filePath}`);
console.debug(`Path to current directory is ${currentFolderPath}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.debug(unknownObject);

myServer.listen(PORT, () => {
  console.debug(`Server is listening on port ${PORT}`);
  console.debug('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
