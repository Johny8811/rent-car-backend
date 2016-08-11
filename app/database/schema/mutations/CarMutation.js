/**
 * Created by Jan on 27.7.2016.
 */
import {
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
  name: 'AddCar',
  inputFields: {
    brand: { type: new GraphQLNonNull(GraphQLString) },
    power: { type: new GraphQLNonNull(GraphQLString) },
    carCode: { type: new GraphQLNonNull(GraphQLInt) }
  },
  outputFields: {
    car: {
      type: carType,
      resolve: (payload) => payload
    }
  },
  mutateAndGetPayload({ brand, power, carCode }) {
    return models.car.create({
      brand,
      power,
      carCode
    });
  }
});

const editCarMutation = mutationWithClientMutationId({
  name: 'EditCar',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    brand: { type: GraphQLString },
    power: { type: GraphQLString }
  },
  outputFields: {
    car: {
      type: carType,
      resolve: (payload) => payload[1][0]
    }
  },
  mutateAndGetPayload({ id, brand, power }) {
    return models.car.update({
      brand,
      power
    },
      {
        where:
        {
          id
        },
        returning: true
      });
  }
});

const deleteCarMutation = mutationWithClientMutationId({
  name: 'DeleteCar',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    deleteCar: {
      type: GraphQLString,
      resolve: (payload) => `Object with ID ${payload.id} was deleted`
    }
  },
  mutateAndGetPayload({ id }) {
    models.car.destroy(
      {
        where:
        {
          id
        }
      });
    return { id };
  }
});

export { addCarMutation, editCarMutation, deleteCarMutation };
