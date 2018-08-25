export function getRawArgParts(branch) {
  const collection = [];
  
  traverseValue.call({
    root: {
      collection
    }
  }, branch || {});

  return collection;
}

function traverseValue(value) {
  const { 
    recurse: {
      parentKeys
    } = {},
    root
  } = this || {};

  const isObject = value && typeof value === 'object';

  if (isObject) {
    const entries = Object.entries(value);
    const isArray = Array.isArray(value);
    
    for (const [ key, value ] of entries) {
      const keys = Array.prototype.concat.apply([], parentKeys || []);
      
      const keyPart = { key };
      if (isArray) keyPart.isArray = isArray;
      
      keys.push(keyPart);

      traverseValue.call({
        recurse: {
          parentKeys: keys
        },
        root
      }, value);
    }
    
    return;
  }

  const rawArgPart = { value };

  const isDefaultParam = parentKeys.length === 1 && parentKeys[0].key === '';
  
  if (isDefaultParam) rawArgPart.isDefaultParam = isDefaultParam;
  else rawArgPart.keys = parentKeys;
  
  root.collection.push(rawArgPart);
}
