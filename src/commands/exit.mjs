import { exit as exitProcess } from 'node:process';

export const exit = ({ programMessages }) => {
  console.debug(`${programMessages.goodbye}`);

  exitProcess(0);
};
