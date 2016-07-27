/**
 * Created by Jan on 28.6.2016.
 */

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} from 'graphql';

// Query
import viewerType from './types/viewerType';
import { nodeField } from './nodeDefinitions';

// Mutation
import addCarMutation from './mutations/addCarMutation';
import addBikeMutation from './mutations/addBikeMutation';
import addContractorMutation from './mutations/addContractorMutation';

const Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        viewer: {
            type: viewerType,
            resolve(root, args, context) {
                return context;
            }
        },
        node: nodeField
    }
});

const Mutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addCar: addCarMutation,
        addBike: addBikeMutation,
        addContractors: addContractorMutation
    }
});

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
export default schema;
