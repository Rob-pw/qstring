function individualQuery(key, value) { return ; }

function traverseValue(value) {
  const { parentKey, collection } = this || {};

  const isObject = value && typeof value === 'object';
  const isArray = Array.isArray(value);

  if (!isObject && !isArray) return collection.push(`${parentKey}=${value}`);

  const entries = Object.entries(value);
  for (const [ key, value ] of entries) {
    const currentKey = isArray ? `${parentKey}[${key}]`
      : parentKey ? `${parentKey}.${key}` : key;

    traverseValue.call({
      parentKey: currentKey,
      collection
    }, value);
  }
}

export function stringify(branch) {
  const collection = [];
  traverseValue.call({
    collection
  }, branch);

  const queryString = collection.join('&');
  return `?${queryString}`;
}
