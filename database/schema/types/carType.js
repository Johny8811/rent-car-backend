/**
 * Created by Jan on 19.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import {
    globalIdField
} from 'graphql-relay';

import distributorType from './distributorType';

import { nodeInterface } from '../nodeDefinitions';

const carType = new GraphQLObjectType({
    name: "CarType",
    description: "Car",
    fields: () => ({
        id: globalIdField('carType'),
        distributor: {
            name: "Distributor",
            description: "Dodavatelia auta",
            type: new GraphQLList(distributorType),
            resolve: (root) => {
                return root.getDistributors();
            }
        },
        brand: { type: GraphQLString },
        power: { type: GraphQLString },
        carCode: { type: GraphQLInt }
    }),
    interfaces:  [nodeInterface]
});

export default carType;