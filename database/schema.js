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
import { addBikeMutation, editBikeMutation } from './mutations/BikeMutation';
import { addCarMutation, editCarMutation } from './mutations/CarMutation';
import { addContractorMutation, editContractorMutation } from './mutations/ContractorMutation';

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
        addBike: addBikeMutation,
        addCar: addCarMutation,
        addContractor: addContractorMutation,
        editBike: editBikeMutation,
        editCar: editCarMutation,
        editContractor: editContractorMutation
    }
});

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
export default schema;
