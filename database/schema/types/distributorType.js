/**
 * Created by Jan on 24.7.2016.
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

const distributorType = new GraphQLObjectType({
    name: "DistributorType",
    description: "Distributor of car",
    fields: attributeFields(models.distributor, {
        only: ['id', 'brand', 'distributor', 'carCode'],
        globalId: true
    }),
    interfaces:  [nodeInterface]
});

export default distributorType;