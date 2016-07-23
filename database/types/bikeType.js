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
    name: "Bike",
    description: "This is a bike",
    fields: {
        id: globalIdField('bikeType'),
        brand: { type: GraphQLString },
        objem: { type: GraphQLInt },
        maxSpeed: { type: GraphQLString }
    },
    interfaces:  [nodeInterface]
});

export default bikeType;