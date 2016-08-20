/**
 * Created by Jan on 24.7.2016.
 */
import {
    connectionDefinitions,
} from 'graphql-relay';

import bikeType from '../bikeType';

const {
  connectionType: bikeConnection,
  edgeType: GraphQLBikeEdge
} = connectionDefinitions({ name: 'Bikes', nodeType: bikeType });

export { bikeConnection, GraphQLBikeEdge };
