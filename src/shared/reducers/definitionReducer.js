import _ from 'lodash';
import { SwaggerLoadingStatus, ActionType } from '../constants/constants';
import { resolveAllOf } from '../helpers/allOfResolver';

const initialState = {
  store: {},
  tags: [],
  entrypoints: [],
  swaggerLoadingStatus: SwaggerLoadingStatus.INITIAL,
};

function extractTags(definedTags, entrypoints) {
  return _.uniqBy(
    [
      ...definedTags,
      ..._.flatMap(entrypoints, entrypoint =>
        _.map(entrypoint.operation.tags, tag => ({
          name: tag,
          description: '',
        }))),
    ],
    'name');
}

function extractEntrypoints(pathsObject) {
  return _.flatMap(pathsObject, (pathObject, path) =>
    _.map(pathObject, (operationObject, method) => ({
      path, method, operation: operationObject,
    })));
}

function defineSchema(schema, definitions) {
  if (!schema) {
    return schema;
  }
  if (schema.$ref) {
    return defineSchema(definitions(schema.$ref), definitions);
  }

  switch (schema.type) {
    case 'object':
      return {
        ...schema,
        properties: _.mapValues(schema.properties, property => defineSchema(property, definitions)),
      };
    case 'array':
      return {
        ...schema,
        items: defineSchema(schema.items, definitions),
      };
    default:
      return schema;
  }
}

function defineEntrypoints(entrypoints, getDefinition) {
  return entrypoints.map(entrypoint => ({
    ...entrypoint,
    operation: {
      ...entrypoint.operation,
      parameters: _.map(entrypoint.operation.parameters, param => {
        if (param.$ref) {
          return getDefinition(param.$ref);
        }
        return { ...param, schema: defineSchema(param.schema, getDefinition) };
      }),
      responses: _.mapValues(entrypoint.operation.responses, responseObject => ({
        ...responseObject,
        schema: defineSchema(responseObject.schema, getDefinition),
      })),
    },
  }));
}

function getDefinition(swaggerDefinitions) {
  return (key) => {
    if (key.startsWith('#/definitions/')) {
      const definitionKey = _.replace(key, '#/definitions/', '');
      return swaggerDefinitions[definitionKey];
    }
    return undefined;
  };
}

export default function definitionReducer(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case ActionType.FETCH_DEFINITION_SUCCESS:
      const swaggerDefinition = action.definition;
      const swaggerDefinitions = resolveAllOf(swaggerDefinition.definitions);
      const swaggerPaths = _.get(swaggerDefinition, 'paths', {});
      const swaggerTags = _.get(swaggerDefinition, 'tags', []);
      const swaggerEntrypoints = extractEntrypoints(swaggerPaths);

      const entrypoints = defineEntrypoints(
        swaggerEntrypoints,
        getDefinition(swaggerDefinitions)
      );

      const tags = extractTags(swaggerTags, entrypoints);

      newState.store = swaggerDefinition;
      newState.entrypoints = entrypoints;
      newState.tags = tags;
      newState.swaggerLoadingStatus = SwaggerLoadingStatus.LOADING_COMPLETED;
      break;

    case ActionType.FETCH_DEFINITION_FAILURE:
      newState.swaggerLoadingStatus = SwaggerLoadingStatus.LOADING_FAILED;
      newState.swaggerLoadingError = action.error;
      break;

    default:
      break;
  }

  return newState;
}
