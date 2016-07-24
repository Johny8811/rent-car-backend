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

const carType = new GraphQLObjectType({
    name: "Car",
    description: "This represent a car, ktore je kokotne a toto je dalsi kus kodu kt by sa tam mal pridat",
    fields: () => ({
        id: globalIdField('carType'),
        contractor: {
            name: "Contractor",
            description: "Dodavatelia auta",
            type: contractorConnection,
            args: connectionArgs,
            //resolve: (root) => contractors.find(con => con.id == root.id)
            resolve: (root, args) => connectionFromArray(contractors, args)
        },
        mark: { type: GraphQLString },
        power: { type: GraphQLString }
    }),
    interfaces:  [nodeInterface]
});