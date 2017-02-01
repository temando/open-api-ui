import request from 'superagent';
import yaml from 'js-yaml';
import { ActionType } from '../constants/constants';

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
    request
      .get(url)
      .timeout({
        response: 5000,
        deadline: 60000,
      })
      .then((response) => {
        let definition = response.body;

        if (url.endsWith('yaml') || url.endsWith('yml')) {
          definition = yaml.safeLoad(response.text);
        } else if (url.endsWith('json')) {
          definition = JSON.parse(response.text);
        }

        if (definition) {
          dispatch(fetchDefinitionSuccess(definition));
        }
      }).catch((error) => {
        dispatch(fetchDefinitionFailure(error));
      }
    );
  };
}

function fetchDefinitionSuccess(definition) {
  return {
    type: ActionType.FETCH_DEFINITION_SUCCESS,
    definition,
  }
}

function fetchDefinitionFailure(error) {
  return {
    type: ActionType.FETCH_DEFINITION_FAILURE,
    error,
  }
}

