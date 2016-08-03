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

import models from '../../source/models';

const addBikeMutation = mutationWithClientMutationId({
    name: "AddBike",
    inputFields: {
        brand: { type: new GraphQLNonNull(GraphQLString)},
        volume: { type: new GraphQLNonNull(GraphQLInt)},
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
    mutateAndGetPayload({ brand, volume, maxSpeed}) {
        return models.bike.create({
            brand: brand,
            volume: volume,
            maxSpeed: maxSpeed
        });
    }
});

const editBikeMutation = mutationWithClientMutationId({
    name: "EditBike",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        brand: { type: GraphQLString},
        volume: { type: GraphQLInt},
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
    mutateAndGetPayload({id, brand, volume, maxSpeed}) {
        return models.bike.update({
            brand: brand,
            volume: volume,
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

const deleteBikeMutation = mutationWithClientMutationId({
    name: "DeleteBike",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        deleteBike: {
            type: GraphQLString,
            resolve: (payload) => {
                return `Object with ID ${payload.id} was deleted`;
            }
        }
    },
    mutateAndGetPayload({id}) {
        models.bike.destroy(
        {
            where:
            {
                id: id
            }
        });
        return {id};
    }
});

export { addBikeMutation, editBikeMutation, deleteBikeMutation };