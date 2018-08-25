import { parseParts } from './parse';

export function parse(queryString) {
  if (!queryString) return {};

  const sansQuestionMark = queryString[0] === '?' ? queryString.substring(1) : queryString;
  const parts = sansQuestionMark.split('&');

  const result = parseParts(parts);
  return result; 
}