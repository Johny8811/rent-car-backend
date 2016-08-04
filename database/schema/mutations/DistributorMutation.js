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

import distributorType from '../types/distributorType';

import models from '../../source/models';

const addDistributorMutation = mutationWithClientMutationId({
    name: "AddDistributor",
    inputFields: {
        brand: { type: new GraphQLNonNull(GraphQLString)},
        distributor: { type: new GraphQLNonNull(GraphQLString)},
        carCode: { type: new GraphQLNonNull(GraphQLInt) }
    },
    outputFields: {
        distributor:{
            type: distributorType,
            resolve: (payload) => {
                return payload;
            }
        }
    },
    mutateAndGetPayload({ brand, distributor, carCode }) {
        return models.distributor.create({
            brand: brand,
            distributor: distributor,
            carCode: carCode
        });
    }
});

const editDistributorMutation = mutationWithClientMutationId({
    name: "EditDistributor",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        brand: { type: GraphQLString},
        distributor: { type: GraphQLString}
    },
    outputFields: {
        distributor: {
            type: distributorType,
            resolve: (payload) => {
                return payload[1][0];
            }
        }
    },
    mutateAndGetPayload({id, brand, distributor}) {
        return models.distributor.update({
            brand: brand,
            distributor: distributor
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

const deleteDistributorMutation = mutationWithClientMutationId({
    name: "DeleteDistributor",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        deleteDistributor: {
            type: GraphQLString,
            resolve: (payload) => {
                return `Object with ID ${payload.id} was deleted`;
            }
        }
    },
    mutateAndGetPayload({id}) {
        models.distributor.destroy(
            {
                where:
                {
                    id: id
                }
            });
        return {id};
    }
});

export { addDistributorMutation, editDistributorMutation, deleteDistributorMutation };