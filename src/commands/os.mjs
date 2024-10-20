import nodeOs from 'node:os';

const options = {
  eol: '--EOL',
  cpus: '--cpus',
  homedir: '--homedir',
  username: '--username',
  architecture: '--architecture',
};

const help = {
  usage: 'os',
  options: {
    eol: {
      usage: `os ${options.eol}`,
      description: {
        text: 'Get EOL (default system End-Of-Line) and print it to console',
      },
    },
    cpus: {
      usage: `os ${options.cpus}`,
      description: {
        text: 'Get host machine CPUs info and print it to console',
        hint: '(overall amount of CPUS plus model and clock rate (in GHz) for each of them)',
      },
    },
    homedir: {
      usage: `os ${options.homedir}`,
      description: {
        text: 'Get home directory and print it to console',
      },
    },
    username: {
      usage: `os ${options.username}`,
      description: {
        text: 'Get current system user name and print it to console',
      },
    },
    architecture: {
      usage: `os ${options.architecture}`,
      description: {
        text: 'Get CPU architecture for which Node.js binary has compiled and print it to console',
      },
    },
  },
  description: {
    text: 'Operating system info',
  },
};

const osMap = {
  eol: JSON.stringify(nodeOs.EOL),
  cpus: nodeOs.cpus(),
  homedir: nodeOs.homedir(),
  username: nodeOs.userInfo().username,
  architecture: nodeOs.arch(),
};

const os = ({ passedOptions }) => {
  if (passedOptions?.length > 0) {
    passedOptions.forEach((option) => {
      console.debug(osMap[`${option}`]);
    });
  } else {
    console.debug(osMap);
  }
};

export default {
  func: os,
  options,
  help,
};
