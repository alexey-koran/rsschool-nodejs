import { fork } from 'node:child_process';
import { dirname } from 'node:path';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

const filePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(filePath);

const spawnChildProcess = async (args) => {
  const controller = new AbortController();

  const childProcess = fork(`${currentFolderPath}/files/script.js`, [...args], { silent: true });

  stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(stdout);

  childProcess.on('error', (err) => {
    throw new Error(err);
  });

  controller.abort();
};

spawnChildProcess(['test1', 'test2', 'test3', 'test4', 'test5']);
