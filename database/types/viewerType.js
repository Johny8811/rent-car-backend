/**
 * Created by Jan on 24.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLList,
} from 'graphql';

import {
    globalIdField
} from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';

import bikeType from './bikeType';
import carType from './carType';

import {
    contractorConnection,
    connectionArgs,
    connectionFromArray
} from './connections/contractorConnection';

// --------------------------- zmena zdroju z natvrdo napisanych dat na databazu
import cars from "../cars";
import bikes from "../bikes";
import contractors from '../contractors';
// ---------------------------

const viewerType = new GraphQLObjectType({
    name: 'ViewerType',
    description: "Root field for Relay",
    fields: {
        id: globalIdField('viewerType'),
        cars: {
            type: new GraphQLList(carType),
            description: "Cars List",
            resolve: () => cars
        },
        bikes: {
            type: new GraphQLList(bikeType),
            description: "Bike List",
            resolve: () => bikes
        },
        allContractors: {
            type: contractorConnection,
            description: "All contractors of cars",
            args: connectionArgs,
            resolve: (root, args) => connectionFromArray(
                contractors,
                args
            )
        }
    },
    interfaces:  [nodeInterface]
});

export default viewerType;