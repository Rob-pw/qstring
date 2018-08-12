function arrayContents(string) {
  const [openingIndex, closingIndex] = [string.indexOf('['), string.indexOf(']')];
  if (openingIndex === -1 || closingIndex === -1) return { isArray: false };

  const inner = string.substring(openingIndex + 1, closingIndex);
  return { inner, openingIndex, closingIndex, isArray: true, hasBrackets: true };
}

function traverse(parts) {
  const { value, parentScope } = this;
  const currentPart = parts.shift();

  const { inner: index, openingIndex, hasBrackets } = arrayContents(currentPart);

  let key = decodeURIComponent(hasBrackets ? currentPart.substring(0, openingIndex) : currentPart);

  const moreToCome = !!parts.length;
  const currentValue = parentScope[key];
  const isArray = hasBrackets || (!moreToCome && key in parentScope && currentValue !== value);
  const wrapParentValue = isArray && !hasBrackets && !Array.isArray(currentValue);

  const valueToSet = wrapParentValue ? [currentValue]
    : currentValue || (
        hasBrackets ? []
        : moreToCome ? {}
          : value
      );

  parentScope[key] = valueToSet;

  let childScope;
  if (isArray) {
    let arrayValue = value;
    if (moreToCome) {
      childScope = {};
      arrayValue = childScope;
    }

    if (index) valueToSet[index] = arrayValue;
    else valueToSet.push(arrayValue);
  } else if (moreToCome) childScope = valueToSet;

  if (childScope) traverse.call({
    parentScope: childScope,
    value
  }, parts);
}

export function parse(queryString) {
  let parts;
  if (Array.isArray(queryString)) parts = queryString;
  else {
    const sansQuestionMark = queryString[0] === '?' ? queryString.substring(1) : queryString;
    parts = sansQuestionMark.split('&');
  }

  const queryPaths = parts
    .map(q => q.split('='))
    .map(([path, value]) => [path.split('.'), value]);

  const result = {};
  queryPaths.forEach(([ parts, value ]) =>
    traverse.call({
      parentScope: result,
      value: value ? parseIndividual(value) : true
    }, parts)
  );

  return result;
}

function parseIndividual(value) {
  const numberValue = parseFloat(value);
  if (!isNaN(numberValue)) return numberValue;

  const { isArray, inner, openingIndex, closingIndex } = arrayContents(value);
  if (isArray) return inner.split(',').map(parseIndividual);

  return decodeURIComponent(value);
}
