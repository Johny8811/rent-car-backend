/**
 * Created by Jan on 19.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql';

import {
    globalIdField
} from 'graphql-relay';

import contractorType from './contractorType';

import { nodeInterface } from '../nodeDefinitions';

const carType = new GraphQLObjectType({
    name: "CarType",
    description: "Car",
    fields: () => ({
        id: globalIdField('carType'),
        contractor: {
            name: "Contractor",
            description: "Dodavatelia auta",
            type: new GraphQLList(contractorType),
            resolve: (root) => {
                return root.getContractors();
            }
        },
        mark: { type: GraphQLString },
        power: { type: GraphQLString }
    }),
    interfaces:  [nodeInterface]
});

export default carType;