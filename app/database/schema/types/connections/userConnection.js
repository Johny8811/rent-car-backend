/**
 * Created by Jan on 24.7.2016.
 */
import {
    connectionDefinitions,
} from 'graphql-relay';

import userType from '../userType';

const {
  connectionType: userConnection,
  edgeType: GraphQLUserEdge
} = connectionDefinitions({ name: 'Users', nodeType: userType });

export { userConnection, GraphQLUserEdge };
