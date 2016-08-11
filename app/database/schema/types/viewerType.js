/**
 * Created by Jan on 24.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLList,
} from 'graphql';

import {
    globalIdField,
    connectionArgs,
    connectionFromPromisedArray
} from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';

import bikeType from './bikeType';
import carType from './carType';

import distributorConnection from './connections/distributorConnection';

import models from '../../source/models';

const viewerType = new GraphQLObjectType({
  name: 'ViewerType',
  description: 'Root field for Relay',
  fields: {
    id: globalIdField('viewer'),
    cars: {
      type: new GraphQLList(carType),
      description: 'Cars List',
      resolve: () => models.car.findAll()
    },
    bikes: {
      type: new GraphQLList(bikeType),
      description: 'Bike List',
      resolve: () => models.bike.findAll()
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
