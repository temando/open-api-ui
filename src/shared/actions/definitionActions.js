import request from 'superagent';
import yaml from 'js-yaml';

export function fetchDefinition(url) {
  return (dispatch) => {
    // Hack because I'm a noob at React, if the url is actually an object (JSON)
    // dispatch that instead.
    if (typeof url !== 'string') {
      dispatch(gotDefinition(url));
    } else {
      request.get(url).then((response) => {
        if (url.endsWith('yaml') || url.endsWith('yml')) {
          dispatch(gotDefinition(yaml.safeLoad(response.text)));
        } else {
          dispatch(gotDefinition(response.body));
        }
      }).catch((err) => {
        alert(`An error occured fetching definition: ${err.message}`);
      });
    }
  }
}

export function gotDefinition(definition) {
  return {
    type: 'GOT_DEFINITION',
    definition
  }
}
