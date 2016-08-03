/**
 * Created by Jan on 19.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import {
    globalIdField
} from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';

const bikeType = new GraphQLObjectType({
    name: "BikeType",
    description: "Bike",
    fields: {
        id: globalIdField('bikeType'),
        brand: { type: GraphQLString },
        volume: { type: GraphQLInt },
        maxSpeed: { type: GraphQLString }
    },
    interfaces:  [nodeInterface]
});

export default bikeType;