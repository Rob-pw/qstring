import { parse } from './fromQueryString';

export function parseProcessArgs(args) {
  const filteredArgs = args
    .filter(a => a.includes('--'))
    .map(a => a.replace('--', ''));

  const queryObject = parse(filteredArgs);

  return queryObject;
}
