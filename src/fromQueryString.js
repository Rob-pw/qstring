function traverse(parts) {
  const { value, parentScope } = this;
  const currentPart = parts.shift();

  const openingBracketIndex = currentPart.indexOf('[');
  const closingBracketIndex = currentPart.indexOf(']');
  const hasBrackets = openingBracketIndex > 0 && closingBracketIndex === currentPart.length - 1;

  let key = currentPart;
  let index;
  if (hasBrackets) {
    key = currentPart.substring(0, openingBracketIndex);
    index = currentPart.substring(openingBracketIndex + 1, closingBracketIndex);
  }

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
  } else if (moreToCome) {
    childScope = valueToSet;
  }

  if (childScope) traverse.call({
    parentScope: childScope,
    value
  }, parts);
}

export function parse(queryString) {
  const sansQuestion = queryString.substring(1);
  const parts = sansQuestion.split('&').map(q => q.split('=').map(p => p.split('.')));

  const result = {};
  parts.forEach(([ parts, value ]) =>
    traverse.call({
      parentScope: result,
      value: value ? parseIndividual(value[0]) : true
    }, parts)
  );

  return result;
}

function parseIndividual(value) {
  const numberValue = parseFloat(value);
  if (!isNaN(numberValue)) return numberValue;

  return value;
}
