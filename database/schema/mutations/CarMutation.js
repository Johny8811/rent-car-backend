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

import carType from '../types/carType';

import models from '../../source/models';

const addCarMutation = mutationWithClientMutationId({
    name: "AddCar",
    inputFields: {
        brand: { type: new GraphQLNonNull(GraphQLString)},
        power: { type: new GraphQLNonNull(GraphQLString)},
        carCode: { type: new GraphQLNonNull(GraphQLInt)}
    },
    outputFields: {
        car:{
            type: carType,
            resolve: (payload) => {
                return payload;
            }
        }
    },
    mutateAndGetPayload({ brand, power, carCode }) {
        return models.car.create({
            brand: brand,
            power: power,
            carCode: carCode
        });
    }
});

const editCarMutation = mutationWithClientMutationId({
    name: "EditCar",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        brand: { type: GraphQLString},
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
    mutateAndGetPayload({id, brand, power}) {
        return models.car.update({
            brand: brand,
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

const deleteCarMutation = mutationWithClientMutationId({
    name: "DeleteCar",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        deleteCar: {
            type: GraphQLString,
            resolve: (payload) => {
                return `Object with ID ${payload.id} was deleted`;
            }
        }
    },
    mutateAndGetPayload({id}) {
        models.car.destroy(
            {
                where:
                {
                    id: id
                }
            });
        return {id};
    }
});

export { addCarMutation, editCarMutation, deleteCarMutation };