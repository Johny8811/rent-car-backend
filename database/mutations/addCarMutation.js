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


import cars from '../cars';

const addCarMutation = mutationWithClientMutationId({
    name: "AddCar",
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)},
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
    mutateAndGetPayload: ({id, mark, power}) => {
        const newCar = {
            graphql: "auto",
            id: id,
            mark: mark,
            power: power
        };
        cars.push(newCar);
        return newCar;
    }
});

export default addCarMutation;