import { env } from 'node:process';

import { messages } from '../constants.mjs';

const parseEnv = () => {
  const rssEnv = Object.entries(env).filter(([key]) => key.startsWith('RSS_'));

  const resultStr = rssEnv.map(([key, value]) => `${key}=${value}`).join('; ');

  console.log(messages.cli.env, resultStr);
};

parseEnv();
