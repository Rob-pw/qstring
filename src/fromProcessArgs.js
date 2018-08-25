import { parseParts } from './parse';

export function parseProcessArgs(args) {
  const filteredArgs = args
    .filter(a => a.includes('--'))
    .map(a => a.replace('--', ''));

  const queryObject = parseParts(filteredArgs);

  return queryObject;
}
