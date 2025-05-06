import { EOL, cpus, homedir, userInfo, arch } from 'node:os';

const options = {
  EOL: '--EOL',
  cpus: '--cpus',
  homedir: '--homedir',
  username: '--username',
  architecture: '--architecture',
};

const help = {
  usage: 'os',
  options: {
    EOL: {
      usage: `os ${options.EOL}`,
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

const printEol = () => {
  console.debug(`EOL = ${JSON.stringify(EOL)}`);
};

const printCpusInfo = () => {
  const cpusInfo = cpus();

  const cpuList = cpusInfo.map((cpu) => ({
    Model: cpu.model.trim(),
    'Clock rate (GHz)': cpu.speed / 1000,
  }));

  console.debug(`Overall amount of CPUS: ${cpuList.length}`);
  console.table(cpuList);
};

const printHomeDir = () => {
  console.debug(`Homedir = ${homedir()}`);
};

const printUsername = () => {
  console.debug(`Username = ${userInfo().username}`);
};

const printArchitecture = () => {
  console.debug(`Architecture = ${arch()}`);
};

const osMap = {
  EOL: printEol,
  cpus: printCpusInfo,
  homedir: printHomeDir,
  username: printUsername,
  architecture: printArchitecture,
};

const os = ({ passedOptions }) => {
  if (passedOptions?.length > 0) {
    passedOptions.forEach((option) => {
      osMap[option]();
    });
  } else {
    Object.keys(osMap).forEach((key) => {
      osMap[key]();
    });
  }
};

export default {
  func: os,
  options,
  help,
};
