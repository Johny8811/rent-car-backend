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
    //connectionFromArray,
    connectionFromPromisedArray
} from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';

import bikeType from './bikeType';
import carType from './carType';

import {
    contractorConnection
} from './connections/contractorConnection';

import Data from '../source/syncModels';

const viewerType = new GraphQLObjectType({
    name: 'ViewerType',
    description: "Root field for Relay",
    fields: {
        id: globalIdField('viewerType'),
        cars: {
            type: new GraphQLList(carType),
            description: "Cars List",
            resolve: () => Data.models.car.findAll()
        },
        bikes: {
            type: new GraphQLList(bikeType),
            description: "Bike List",
            resolve: () => {
                return Data.models.bike.findAll();
            }
        },
        allContractors: {
            type: contractorConnection,
            description: "All contractors of cars",
            args: connectionArgs,
            resolve: (root, args) => connectionFromPromisedArray(
                Data.models.contractor.findAll(),
                args
            )
        }
    },
    interfaces:  [nodeInterface]
});

export default viewerType;