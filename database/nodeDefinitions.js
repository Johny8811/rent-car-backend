/**
 * Created by Jan on 19.7.2016.
 */
import {
    nodeDefinitions,
    fromGlobalId
} from 'graphql-relay';

import { apiToGetDataFromTyepAndID, apiToGetGraphQLObjectType } from './utils';

const { nodeField, nodeInterface } = nodeDefinitions(
    (globalId) =>
        {
            return apiToGetDataFromTyepAndID(globalId);
        },
    (obj) =>
        {
            return apiToGetGraphQLObjectType(obj.type);
        }
);

export { nodeField, nodeInterface };