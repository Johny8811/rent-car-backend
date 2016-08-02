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

import Data from '../source/syncModels';

const addBikeMutation = mutationWithClientMutationId({
    name: "AddBike",
    inputFields: {
        brand: { type: new GraphQLNonNull(GraphQLString)},
        objem: { type: new GraphQLNonNull(GraphQLInt)},
        maxSpeed: { type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        bike:{
            type: bikeType,
            resolve: (payload) => {
                return payload;
            }
        }
    },
    mutateAndGetPayload({ brand, objem, maxSpeed}) {
        return Data.models.bike.create({
            brand: brand,
            objem: objem,
            maxSpeed: maxSpeed
        });
    }
});

const editBikeMutation = mutationWithClientMutationId({
    name: "EditBike",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        brand: { type: GraphQLString},
        objem: { type: GraphQLInt},
        maxSpeed: { type: GraphQLString}
    },
    outputFields: {
        bike: {
            type: bikeType,
            resolve: (payload) => {
                return payload[1][0];
            }
        }
    },
    mutateAndGetPayload({id, brand, objem, maxSpeed}) {
        return Data.models.bike.update({
            brand: brand,
            objem: objem,
            maxSpeed: maxSpeed
        },
        {
            where:
            {
                id: id
            },
            returning: true
        });
    }
});

export { addBikeMutation, editBikeMutation };