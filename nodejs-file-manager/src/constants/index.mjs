import { userInfo } from 'node:os';

export const DEFAULT_USERNAME = userInfo().username;
