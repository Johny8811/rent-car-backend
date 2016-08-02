/**
 * Created by Jan on 27.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {
    mutationWithClientMutationId
} from 'graphql-relay';

import carType from '../types/carType';

import Data from '../source/syncModels';

const addCarMutation = mutationWithClientMutationId({
    name: "AddCar",
    inputFields: {
        mark: { type: new GraphQLNonNull(GraphQLString)},
        power: { type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        car:{
            type: carType,
            resolve: (payload) => {
                return payload;
            }
        }
    },
    mutateAndGetPayload({ mark, power }) {
        return Data.models.car.create({
            mark: mark,
            power: power
        }).setContractors([Data.models.constructor]);
    }
});

const editCarMutation = mutationWithClientMutationId({
    name: "EditCar",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        mark: { type: GraphQLString},
        power: { type: GraphQLString}
    },
    outputFields: {
        car: {
            type: carType,
            resolve: (payload) => {
                return payload[1][0];
            }
        }
    },
    mutateAndGetPayload({id, mark, power}) {
        return Data.models.car.update({
            mark: mark,
            power: power
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

export { addCarMutation, editCarMutation };