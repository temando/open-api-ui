import request from 'superagent';
import yaml from 'js-yaml';

/**
 * Responsible for fetching the Swagger from the given `url` and
 * returning it. Handles `.yaml`, `.yml`, `.json` URL's.
 *
 * Note: URL can be an object, which will just be returned without
 * any further processing.
 *
 * @param {String|Object} url
 */
export function fetchDefinition(url) {
  return (dispatch) => {
    request.get(url).then((response) => {
      let definition = response.body;

      // Handle YAML
      if (url.endsWith('yaml') || url.endsWith('yml')) {
        definition = yaml.safeLoad(response.text);

      // Or handle JSON.
      } else if (url.endsWith('json')) {
        definition = JSON.parse(response.text);
      }

      if (definition) {
        dispatch(gotDefinition(definition));
      }
    }).catch((err) => {
      alert(`An error occured fetching definition: ${err.message}`);
    });
  }
}

export function gotDefinition(definition) {
  return {
    type: 'GOT_DEFINITION',
    definition
  }
}
