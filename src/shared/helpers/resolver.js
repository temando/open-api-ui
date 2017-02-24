import _ from 'lodash';

function resolveAllOfItem(node) {
  const output = _.cloneDeep(node);
  delete output.allOf;

  const allOfItems = node.allOf;
  for (let i = 0; i < allOfItems.length; i++) {
    const item = allOfItems[i];

    Object.keys(item).forEach(key => {
      if (!output.hasOwnProperty(key)) {
        output[key] = _.cloneDeep(item[key]);
      } else if (key === 'properties') {
        const properties = item[key];

        Object.keys(properties).forEach(name => {
          output.properties[name] = _.cloneDeep(properties[name]);
        });
      } else if (key === 'required') {
        // Concatenate to existing list and remove duplicates
        const requiredArray = _.uniq(output.required.concat(item[key]));
        output.required = requiredArray.sort();
      }
    });
  }

  return output;
}

export function resolveAllOfRecursive(obj) {
  Object.keys(obj).forEach(key => {
    const item = obj[key];

    if (item === null) {
      throw new TypeError('Swagger 2.0 does not support null types (' + obj + ').  See https://github.com/swagger-api/swagger-spec/issues/229.');
    }

    if (typeof item === 'object') {
      resolveAllOfRecursive(item);
    }

    if (item.allOf && Array.isArray(item.allOf)) {
      obj[key] = resolveAllOfItem(item);
    }
  });
}

/**
 * Resolves allOf for definitions object
 *
 * @param {Object} obj
 *
 * @return {Object} definitions object that has allOf resolved
 */
export function resolveAllOf(obj) {
  const clonedObj = _.clone(obj);
  resolveAllOfRecursive(clonedObj);

  return clonedObj;
}
