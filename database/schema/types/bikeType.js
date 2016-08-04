/**
 * Created by Jan on 19.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import {
    globalIdField
} from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';

import { attributeFields } from 'graphql-sequelize';

import models from '../../source/models';

const bikeType = new GraphQLObjectType({
    name: "BikeType",
    description: "Bike",
    fields: attributeFields(models.bike, {
        only: ['id', 'brand', 'volume', 'maxSpeed'],
        globalId: true,
        allowNull: true
    }),
    interfaces:  [nodeInterface]
});

export default bikeType;