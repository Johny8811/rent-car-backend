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

import bikeType from '../types/bikeType';
import { GraphQLBikeEdge } from '../types/connections/bikeConnection';

import models from '../../source/models';

const addBikeMutation = mutationWithClientMutationId({
  name: 'AddBike',
  inputFields: {
    brand: { type: new GraphQLNonNull(GraphQLString) },
    volume: { type: new GraphQLNonNull(GraphQLInt) },
    maxSpeed: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    bikeEdge: {
      type: GraphQLBikeEdge,
      resolve: (payload) => ({
        // funkcia cursorForObjectInConnection bolanahradena offsetToCursor
        // issue: https://github.com/graphql/graphql-relay-js/issues/29
        // treba pozret ako funguje cursorForObjectInConnection a hned
        // je jasne kde nastava problem, objekty sa nezhoduju
        cursor: offsetToCursor(payload.dataValues.id - 1),
        node: payload
      })
    }
  },
  mutateAndGetPayload({ brand, volume, maxSpeed }) {
    return models.bike.create({
      brand,
      volume,
      maxSpeed
    });
  }
});

const editBikeMutation = mutationWithClientMutationId({
  name: 'EditBike',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    brand: { type: GraphQLString },
    volume: { type: GraphQLInt },
    maxSpeed: { type: GraphQLString }
  },
  outputFields: {
    bike: {
      type: bikeType,
      resolve: (payload) => payload[1][0]
    }
  },
  mutateAndGetPayload({ id, brand, volume, maxSpeed }) {
    return models.bike.update({
      brand,
      volume,
      maxSpeed
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

const deleteBikeMutation = mutationWithClientMutationId({
  name: 'DeleteBike',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    deleteBike: {
      type: GraphQLString,
      resolve: (payload) => `Object with ID ${payload.id} was deleted`
    }
  },
  mutateAndGetPayload({ id }) {
    models.bike.destroy(
      {
        where:
        {
          id
        }
      });
    return { id };
  }
});

export { addBikeMutation, editBikeMutation, deleteBikeMutation };
