/**
 * Created by Jan on 24.7.2016.
 */
import {
  GraphQLObjectType,
  GraphQLString
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

import models from '../../source/models';

const viewerType = new GraphQLObjectType({
  name: 'ViewerType',
  description: 'Root field for Relay',
  fields: {
    id: globalIdField('viewer'),
    loggedIn: {
      type: loggedInType,
      description: "Logged in user",
      resolve: (root, args, context, { rootValue: { token } } ) => {
        console.log(token);
        if (token) {
          return models.user.findOne({where: {username: token.username}});
        } else {
          return {
            id: 0
          }
        }
        //return models.user.findOne({where: {username: 'janci'/*token.username*/}});
      }
    },
    users: {
      type: userConnection,
      description: "Registered users",
      args: connectionArgs,
      resolve: (root, args) => connectionFromPromisedArray(
        models.user.findAll(),
        args
      )
    },
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
      resolve: (root, args) => {
        return connectionFromPromisedArray(
        models.bike.findAll(),
        args
      )}
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
