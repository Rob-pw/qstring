import { getRawArgParts } from './stringify';
import { getArgumentParts } from './getArgumentParts';

export function stringify(object) {
  const { prefix = '?', encode = true } = this || {};
  
  const rawArgParts = getRawArgParts(object);
  const argumentParts = getArgumentParts.call({
    encode
  }, rawArgParts);

  const queryString = argumentParts.join('&');

  return (prefix ? prefix : '') + queryString;
}