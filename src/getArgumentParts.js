export function getArgumentParts(rawArgParts) {
  const { 
    encode
  } = this || {};

  const encodeComponent = encode === false ? (value => value)
    : typeof encode === 'function' ?
      encode : encodeURIComponent;

  const argumentParts = [];

  for (const part of rawArgParts) {
    const { isDefaultParam, keys, value } = part;

    const valueToSet = encodeComponent(value);

    if (isDefaultParam) {
      argumentParts.push(valueToSet);
      continue;
    }

    const $assemblePath = assemblePath.bind({ encodeComponent });
    const keyPath = keys.reduce($assemblePath, '');

    argumentParts.push(`${keyPath}=${valueToSet}`);
  }

  return argumentParts;
}

function assemblePath(path, { isArray, key }) {
  const keyToSet = this.encodeComponent(key);

  if (!path) return keyToSet;

  const getterPath = isArray ? 
    `[${keyToSet}]` : `.${keyToSet}`;

  return path + getterPath;
}