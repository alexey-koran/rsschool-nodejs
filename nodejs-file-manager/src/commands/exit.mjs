import { exit as exitProcess } from 'node:process';

const help = {
  usage: '.exit',
  description: {
    text: 'Exit program',
  },
};

const exit = ({ programMessages }) => {
  console.debug(`${programMessages.goodbye}`);

  exitProcess(0);
};

export default {
  func: exit,
  help,
};
