/**
 * Created by Jan on 19.7.2016.
 */
import {
    nodeDefinitions
} from 'graphql-relay';

import { apiToGetDataFromTyepAndID, apiToGetGraphQLObjectType } from './utils';

const { nodeField, nodeInterface } = nodeDefinitions(
    (globalId) => apiToGetDataFromTyepAndID(globalId),
    (obj) => apiToGetGraphQLObjectType(obj.type)
);

export { nodeField, nodeInterface };
