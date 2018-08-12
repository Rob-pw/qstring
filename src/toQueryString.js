export function stringify(branch) {
  const collection = [];
  traverseValue.call({
    collection
  }, branch);

  const queryString = collection.join('&');
  return `?${queryString}`;
}

function traverseValue(value) {
  const { parentKey, collection } = this || {};

  const isObject = value && typeof value === 'object';
  const isArray = Array.isArray(value);

  if (!isObject && !isArray) return collection.push(`${parentKey}=${encodeURIComponent(value)}`);

  const entries = Object.entries(value);
  for (const [ key, value ] of entries) {
    const encodedKey = encodeURIComponent(key);
    const currentKey = isArray ? `${parentKey}[${encodedKey}]`
      : parentKey ? `${parentKey}.${encodedKey}` : encodedKey;

    traverseValue.call({
      parentKey: currentKey,
      collection
    }, value);
  }
}
