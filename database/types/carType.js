/**
 * Created by Jan on 19.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import {
    globalIdField
} from 'graphql-relay';

import contractorType from './contractorType';

import { nodeInterface } from '../nodeDefinitions';

// --------------------------- zmena zdroju z natvrdo napisanych dat na databazu
import contractors from '../contractors';
// ---------------------------

const carType = new GraphQLObjectType({
    name: "CarType",
    description: "Car",
    fields: () => ({
        id: globalIdField('carType'),
        contractor: {
            name: "Contractor",
            description: "Dodavatelia auta",
            type: contractorType,
            resolve: (root) => contractors.find(con => con.mark == root.mark)
        },
        mark: { type: GraphQLString },
        power: { type: GraphQLString }
    }),
    interfaces:  [nodeInterface]
});

export default carType;