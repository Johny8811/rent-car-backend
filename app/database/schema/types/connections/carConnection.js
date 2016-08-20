/**
 * Created by Jan on 24.7.2016.
 */
import {
    connectionDefinitions,
} from 'graphql-relay';

import carType from '../carType';

const {
  connectionType: carConnection,
  edgeType: GraphQLCarEdge
} = connectionDefinitions({ name: 'Cars', nodeType: carType });

export { carConnection, GraphQLCarEdge };
