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
import { addBikeMutation, editBikeMutation, deleteBikeMutation } from './mutations/BikeMutation';
import { addCarMutation, editCarMutation, deleteCarMutation } from './mutations/CarMutation';
import { addDistributorMutation, editDistributorMutation, deleteDistributorMutation } from './mutations/DistributorMutation';

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
        addDistributor: addDistributorMutation,
        editBike: editBikeMutation,
        editCar: editCarMutation,
        editDistributor: editDistributorMutation,
        deleteBike: deleteBikeMutation,
        deleteCar: deleteCarMutation,
        deleteDistributor: deleteDistributorMutation
    }
});

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
export default schema;
