/**
 * Created by Jan on 27.7.2016.
 */
import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import {
  mutationWithClientMutationId,
  offsetToCursor
} from 'graphql-relay';

import carType from '../types/carType';
import { GraphQLCarEdge } from '../types/connections/carConnection';
import viewerType from '../types/viewerType';

import models from '../../source/models';

const addCarMutation = mutationWithClientMutationId({
  name: 'AddCar',
  inputFields: {
    brand: { type: new GraphQLNonNull(GraphQLString) },
    power: { type: new GraphQLNonNull(GraphQLString) },
    carCode: { type: new GraphQLNonNull(GraphQLInt) }
  },
  outputFields: {
    carEdge: {
      type: GraphQLCarEdge,
      resolve: (payload) => {
        return models.car.findAll().then(cars => ({
          // funkcia cursorForObjectInConnection bolanahradena offsetToCursor
          // issue: https://github.com/graphql/graphql-relay-js/issues/29
          // treba pozret ako funguje cursorForObjectInConnection a hned
          // je jasne kde nastava problem, objekty sa nezhoduju
          cursor: offsetToCursor(cars.length -1),
          node: payload
        }));
      }
    },
    viewer: {
      type: viewerType,
      resolve(root, args, context) {
        return context;
      }
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
