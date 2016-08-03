/**
 * Created by Jan on 24.7.2016.
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

const distributorType = new GraphQLObjectType({
    name: "DistributorType",
    description: "Distributor of car",
    fields: {
        id: globalIdField('distributorType'),
        brand: { type: GraphQLString },
        distributor: { type: GraphQLString },
        carCode: { type: GraphQLInt }
    },
    interfaces:  [nodeInterface]
});

export default distributorType;