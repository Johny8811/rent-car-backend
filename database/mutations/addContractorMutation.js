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


import contractors from '../contractors';

const addContractorMutation = mutationWithClientMutationId({
    name: "AddContractor",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)},
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
    mutateAndGetPayload: ({id, mark, contractor}) => {
        const newContractor = {
            graphql: "dodavatel",
            id: id,
            mark: mark,
            contractor: contractor
        };
        contractors.push(newContractor);
        return newContractor;
    }
});

export default addContractorMutation;