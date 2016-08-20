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

import distributorType from '../types/distributorType';
import { GraphQLDistributorsEdge } from '../types/connections/distributorConnection';

import models from '../../source/models';

const addDistributorMutation = mutationWithClientMutationId({
  name: 'AddDistributor',
  inputFields: {
    brand: { type: new GraphQLNonNull(GraphQLString) },
    distributor: { type: new GraphQLNonNull(GraphQLString) },
    carCode: { type: new GraphQLNonNull(GraphQLInt) }
  },
  outputFields: {
    distributorEdge: {
      type: GraphQLDistributorsEdge,
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
  mutateAndGetPayload({ brand, distributor, carCode }) {
    return models.distributor.create({
      brand,
      distributor,
      carCode
    });
  }
});

const editDistributorMutation = mutationWithClientMutationId({
  name: 'EditDistributor',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    brand: { type: GraphQLString },
    distributor: { type: GraphQLString }
  },
  outputFields: {
    distributor: {
      type: distributorType,
      resolve: (payload) => payload[1][0]
    }
  },
  mutateAndGetPayload({ id, brand, distributor }) {
    return models.distributor.update({
      brand,
      distributor
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

const deleteDistributorMutation = mutationWithClientMutationId({
  name: 'DeleteDistributor',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    deleteDistributor: {
      type: GraphQLString,
      resolve: (payload) => `Object with ID ${payload.id} was deleted`
    }
  },
  mutateAndGetPayload({ id }) {
    models.distributor.destroy(
      {
        where:
        {
          id
        }
      });
    return { id };
  }
});

export { addDistributorMutation, editDistributorMutation, deleteDistributorMutation };
