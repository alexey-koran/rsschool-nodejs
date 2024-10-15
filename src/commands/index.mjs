import { add } from './add.mjs';
import { cat } from './cat.mjs';
import { cd } from './cd.mjs';
import { compress } from './compress.mjs';
import { cp } from './cp.mjs';
import { decompress } from './decompress.mjs';
import { exit } from './exit.mjs';
import { hash } from './hash.mjs';
import { help } from './help.mjs';
import { ls } from './ls.mjs';
import { mv } from './mv.mjs';
import { os } from './os.mjs';
import { rm } from './rm.mjs';
import { rn } from './rn.mjs';
import { up } from './up.mjs';

export const commandsMap = {
  add,
  cat,
  cd,
  compress,
  cp,
  decompress,
  '.exit': exit,
  hash,
  help,
  ls,
  mv,
  os,
  rm,
  rn,
  up,
};
