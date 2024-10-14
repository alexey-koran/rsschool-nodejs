export const commandsHelp = {
  add: {
    command: 'add new_file_name',
    description: {
      text: 'Create empty file in current working directory',
    },
  },
  cat: {
    command: 'cat path_to_file',
    description: {
      text: "Read file and print it's content in console",
    },
  },
  cd: {
    command: 'cd path_to_directory',
    description: {
      text: 'Go to dedicated folder from current directory',
      hint: '(path_to_directory can be relative or absolute)',
    },
  },
  compress: {
    command: 'compress path_to_file path_to_destination',
    description: {
      text: 'Compress file',
    },
  },
  cp: {
    command: 'cp path_to_file path_to_new_directory',
    description: {
      text: 'Copy file',
    },
  },
  decompress: {
    command: 'decompress path_to_file path_to_destination',
    description: {
      text: 'Decompress file',
    },
  },
  exit: {
    command: '.exit',
    description: {
      text: 'Exit program',
    },
  },
  hash: {
    command: 'hash path_to_file',
    description: {
      text: 'Calculate hash for file and print it into console',
    },
  },
  help: {
    command: 'help',
    options: {
      commandName: {
        command: 'help command_name',
        description: {
          text: 'Display command description',
        },
      },
    },
    description: {
      text: 'Display program commands, their options and descriptions',
    },
  },
  ls: {
    command: 'ls',
    description: {
      text: 'Print in console list of all files and folders in current directory',
    },
  },
  mv: {
    command: 'mv path_to_file path_to_new_directory',
    description: {
      text: 'Move file',
    },
  },
  os: {
    command: 'os',
    options: {
      flag: {
        eol: {
          command: 'os --EOL',
          description: {
            text: 'Get EOL (default system End-Of-Line) and print it to console',
          },
        },
        cpus: {
          command: 'os --cpus',
          description: {
            text: 'Get host machine CPUs info and print it to console',
            hint: '(overall amount of CPUS plus model and clock rate (in GHz) for each of them)',
          },
        },
        homedir: {
          command: 'os --homedir',
          description: {
            text: 'Get home directory and print it to console',
          },
        },
        username: {
          command: 'os --username',
          description: {
            text: 'Get current system user name and print it to console',
          },
        },
        architecture: {
          command: 'os --architecture',
          description: {
            text: 'Get CPU architecture for which Node.js binary has compiled and print it to console',
          },
        },
      },
    },
    description: {
      text: 'Operating system info',
    },
  },
  rm: {
    command: 'rm path_to_file',
    description: {
      text: 'Delete file',
    },
  },
  rn: {
    command: 'rn path_to_file new_filename',
    description: {
      text: 'Rename file',
      hint: '(content will remain unchanged)',
    },
  },
  up: {
    command: 'up',
    description: {
      text: 'Go upper from current directory',
      hint: "(when you are in the root folder this operation shouldn't change working directory)",
    },
  },
};
