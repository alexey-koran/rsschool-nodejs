import { fork } from 'node:child_process';
import { stdin, stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';

const spawnChildProcess = async (args) => {
  const controller = new AbortController();

  const currentDirname = import.meta.dirname;

  const childProcess = fork(`${currentDirname}/files/script.js`, [...args], { silent: true });

  pipeline(stdin, childProcess.stdin);

  pipeline(childProcess.stdout, stdout);

  childProcess.on('error', (err) => {
    throw new Error(err);
  });

  controller.abort();
};

spawnChildProcess(['test1', 'test2', 'test3', 'test4', 'test5']);
