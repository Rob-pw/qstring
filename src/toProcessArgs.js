import { getRawArgParts } from './stringify';
import { getArgumentParts } from './getArgumentParts';

export function toProcessArgs(object) {
  const rawArgParts = getRawArgParts(object);
  const argumentParts = getArgumentParts.call({
    encode: false
  }, rawArgParts);

  const joinedArguments = argumentParts.join(' --');
  return `--${joinedArguments}`;
}