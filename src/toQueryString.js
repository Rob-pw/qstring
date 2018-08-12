function typeOf(obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}

function individualQuery(key, value) {
  return `${key}=${value}`;
}

function traverseValue(value) {
  const { parentKey, collection } = this || {};

  const type = typeOf(value);
  const isObject = type === 'object';
  const isArray = type === 'array';

  if (!isObject && !isArray) return collection.push(
    individualQuery(parentKey, value)
  );

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
