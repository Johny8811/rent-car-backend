/**
 * Created by Jan on 24.7.2016.
 */
import {
    GraphQLObjectType,
} from 'graphql';

import {
    globalIdField,
    connectionArgs,
    connectionFromPromisedArray
} from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';

import { bikeConnection } from './connections/bikeConnection';
import { carConnection } from './connections/carConnection';
import { distributorConnection } from './connections/distributorConnection';

import models from '../../source/models';

const viewerType = new GraphQLObjectType({
  name: 'ViewerType',
  description: 'Root field for Relay',
  fields: {
    id: globalIdField('viewer'),
    cars: {
      type: carConnection,
      description: 'Cars List',
      args: connectionArgs,
      resolve: (root, args) => connectionFromPromisedArray(
        models.car.findAll(),
        args
      )
    },
    bikes: {
      type: bikeConnection,
      description: 'Bike List',
      args: connectionArgs,
      resolve: (root, args) => connectionFromPromisedArray(
        models.bike.findAll(),
        args
      )
    },
    allDistributors: {
      type: distributorConnection,
      description: 'All distributors of cars',
      args: connectionArgs,
      resolve: (root, args) => connectionFromPromisedArray(
        models.distributor.findAll(),
        args
      )
    }
  },
  interfaces: [nodeInterface]
});

export default viewerType;
