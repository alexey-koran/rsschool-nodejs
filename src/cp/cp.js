import { fork } from 'node:child_process';
import { stdin, stdout, exit } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

const spawnChildProcess = async (args) => {
  const childProcess = fork(
    join(import.meta.dirname, 'files', 'script.js'),
    args,
    {
      silent: true,
    },
  );

  childProcess.on('exit', () => {
    exit();
  });

  await Promise.all([
    pipeline(stdin, childProcess.stdin),
    pipeline(childProcess.stdout, stdout),
  ]);
};

spawnChildProcess(['test1', 'test2', 'test3', 'test4', 'test5']);
