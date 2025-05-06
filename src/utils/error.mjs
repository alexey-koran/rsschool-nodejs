import { EOL } from 'node:os';

export const formatError = (...lines) => `${EOL}${lines.join(EOL)}${EOL}`;
