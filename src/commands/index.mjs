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
  add: {
    func: add,
    flags: {
      support: false,
    },
    propertiesNames: ['New file name'],
  },
  cat: {
    func: cat,
    flags: {
      support: false,
    },
    propertiesNames: ['Path to file'],
  },
  cd: {
    func: cd,
    flags: {
      support: false,
    },
    propertiesNames: ['Path to directory'],
  },
  compress: {
    func: compress,
    flags: {
      support: false,
    },
    propertiesNames: ['Path to file', 'Path to destination'],
  },
  cp: {
    func: cp,
    flags: {
      support: false,
    },
    propertiesNames: ['Path to file', 'Path to new directory'],
  },
  decompress: {
    func: decompress,
    flags: {
      support: false,
    },
    propertiesNames: ['Path to file', 'Path to destination'],
  },
  '.exit': {
    func: exit,
    flags: {
      support: false,
    },
    propertiesNames: [],
  },
  hash: {
    func: hash,
    flags: {
      support: false,
    },
    propertiesNames: ['Path to file'],
  },
  help: {
    func: help,
    flags: {
      support: false,
    },
    propertiesNames: ['Command name'],
  },
  ls: {
    func: ls,
    flags: {
      support: false,
    },
    propertiesNames: [],
  },
  mv: {
    func: mv,
    flags: {
      support: false,
    },
    propertiesNames: ['Path to file', 'Path to new directory'],
  },
  os: {
    func: os,
    flags: {
      support: true,
      list: ['--EOL', '--cpus', '--homedir', '--username', '--architecture'],
    },
    propertiesNames: [],
  },
  rm: {
    func: rm,
    flags: {
      support: false,
    },
    propertiesNames: ['Path to file'],
  },
  rn: {
    func: rn,
    flags: {
      support: false,
    },
    propertiesNames: ['Path to file', 'New filename'],
  },
  up: {
    func: up,
    flags: {
      support: false,
    },
    propertiesNames: [],
  },
};
