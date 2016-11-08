import request from 'superagent';
import yaml from 'js-yaml';

export function fetchDefinition(url) {
  return (dispatch) => {
    request.get(url).then((response) => {
      if (url.endsWith('yaml') || url.endsWith('yml')) {
        dispatch(gotDefinition(yaml.safeLoad(response.text)));
      } else {
        dispatch(gotDefinition(response.body));
      }
    })
  }
}

export function gotDefinition(definition) {
  return {
    type: 'GOT_DEFINITION',
    definition
  }
}
