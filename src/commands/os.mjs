import nodeOs from 'node:os';

const osMap = {
  '--EOL': JSON.stringify(nodeOs.EOL),
  '--cpus': nodeOs.cpus(),
  '--homedir': nodeOs.homedir(),
  '--username': nodeOs.userInfo(),
  '--architecture': nodeOs.arch(),
};

export const os = ({ passedFlags }) => {
  if (passedFlags?.length > 0) {
    passedFlags.forEach((flag) => {
      console.debug(osMap[`${flag}`]);
    });
  } else {
    console.debug(osMap);
  }
};
