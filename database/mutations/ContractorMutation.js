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

import contractorType from '../types/contractorType';

import Data from '../source/syncModels';

const addContractorMutation = mutationWithClientMutationId({
    name: "AddContractor",
    inputFields: {
        mark: { type: new GraphQLNonNull(GraphQLString)},
        contractor: { type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        contractor:{
            type: contractorType,
            resolve: (payload) => {
                return payload;
            }
        }
    },
    mutateAndGetPayload({ mark, contractor }) {
        return Data.models.contractor.create({
            mark: mark,
            contractor: contractor
        });
    }
});

const editContractorMutation = mutationWithClientMutationId({
    name: "EditContractor",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        mark: { type: GraphQLString},
        contractor: { type: GraphQLString}
    },
    outputFields: {
        contractor: {
            type: contractorType,
            resolve: (payload) => {
                return payload[1][0];
            }
        }
    },
    mutateAndGetPayload({id, mark, contractor}) {
        return Data.models.contractor.update({
            mark: mark,
            contractor: contractor
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

export { addContractorMutation, editContractorMutation };