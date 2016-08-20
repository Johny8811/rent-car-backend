/**
 * Created by Jan on 24.7.2016.
 */
import {
    connectionDefinitions,
} from 'graphql-relay';

import distributorType from '../distributorType';

const {
  connectionType: distributorConnection,
  edgeType: GraphQLDistributorsEdge
} = connectionDefinitions({ name: 'Distributors', nodeType: distributorType });

export { distributorConnection, GraphQLDistributorsEdge };
