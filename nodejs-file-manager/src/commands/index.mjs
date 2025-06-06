import add from './add.mjs';
import cat from './cat.mjs';
import cd from './cd.mjs';
import cdFiles from './cdFiles.mjs';
import compress from './compress.mjs';
import cp from './cp.mjs';
import decompress from './decompress.mjs';
import exit from './exit.mjs';
import hash from './hash.mjs';
import help from './help.mjs';
import ls from './ls.mjs';
import mkdir from './mkdir.mjs';
import mv from './mv.mjs';
import os from './os.mjs';
import rm from './rm.mjs';
import rmdir from './rmdir.mjs';
import rn from './rn.mjs';
import up from './up.mjs';

export const commandsMap = {
  add,
  cat,
  cd,
  cdFiles,
  compress,
  cp,
  decompress,
  '.exit': exit,
  hash,
  help,
  ls,
  mkdir,
  mv,
  os,
  rm,
  rmdir,
  rn,
  up,
};
