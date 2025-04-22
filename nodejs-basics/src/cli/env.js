import { env } from 'node:process';

const parseEnv = () => {
  const rssEnv = Object.entries(env).filter(([key]) => key.startsWith('RSS_'));

  const resultStr = rssEnv.map(([key, value]) => `${key}=${value}`).join('; ');

  console.debug(resultStr);
};

parseEnv();
