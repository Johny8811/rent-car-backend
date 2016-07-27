/**
 * Created by Jan on 27.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} from 'graphql';

import {
    mutationWithClientMutationId
} from 'graphql-relay';

import bikeType from '../types/bikeType';


import bikes from '../bikes';

const addBikeMutation = mutationWithClientMutationId({
    name: "AddBike",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        brand: { type: new GraphQLNonNull(GraphQLString)},
        objem: { type: new GraphQLNonNull(GraphQLInt)},
        maxSpeed: { type: new GraphQLNonNull(GraphQLString)},
    },
    outputFields: {
        bike:{
            type: bikeType,
            resolve: (payload) => {
                return payload;
            }
        }
    },
    mutateAndGetPayload: ({id, brand, objem, maxSpeed}) => {
        const newBike = {
            graphql: "motorka",
            id: id,
            brand: brand,
            objem: objem,
            maxSpeed: maxSpeed
        };
        bikes.push(newBike);
        return newBike;
    }
});

export default addBikeMutation;