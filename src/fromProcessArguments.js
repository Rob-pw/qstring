import { parse } from './fromQueryString';

export function parseProcessArgs(args) {
  const filteredArgs = args
    .filter(a => a.includes('--'))
    .map(a => a.replace(/[-]/g, ''));

  const queryObject = parse(filteredArgs);

  return queryObject;
}
