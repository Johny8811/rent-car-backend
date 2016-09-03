/**
 * Created by Jan on 24.7.2016.
 */
import {
  GraphQLObjectType
} from 'graphql';

import {
    globalIdField,
    connectionArgs,
    connectionFromPromisedArray
} from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';

import loggedInType from './loggedInTypy';

import { userConnection } from './connections/userConnection';
import { bikeConnection } from './connections/bikeConnection';
import { carConnection } from './connections/carConnection';
import { distributorConnection } from './connections/distributorConnection';

import {
  user,
  car,
  bike,
  distributor
} from '../../source/models';

const viewerType = new GraphQLObjectType({
  name: 'ViewerType',
  description: 'Root field for Relay',
  fields: {
    id: globalIdField('viewer'),
    loggedIn: {
      type: loggedInType,
      description: 'Logged in user',
      resolve: (root, args, { token }) => {
        if (token) {
          return user.findOne({ where: { username: token.username } });
        }
        return {
          id: 0
        };
      }
    },
    users: {
      type: userConnection,
      description: 'Registered users',
      args: connectionArgs,
      resolve: (root, args) => connectionFromPromisedArray(
        user.findAll(),
        args
      )
    },
    cars: {
      type: carConnection,
      description: 'Cars List',
      args: connectionArgs,
      resolve: (root, args) => connectionFromPromisedArray(
        car.findAll(),
        args
      )
    },
    bikes: {
      type: bikeConnection,
      description: 'Bike List',
      args: connectionArgs,
      resolve: (root, args) => connectionFromPromisedArray(
        bike.findAll(),
        args
      )
    },
    allDistributors: {
      type: distributorConnection,
      description: 'All distributors of cars',
      args: connectionArgs,
      resolve: (root, args) => connectionFromPromisedArray(
        distributor.findAll(),
        args
      )
    }
  },
  interfaces: [nodeInterface]
});

export default viewerType;
