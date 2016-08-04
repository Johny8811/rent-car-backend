/**
 * Created by Jan on 19.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import {
    globalIdField
} from 'graphql-relay';

import distributorType from './distributorType';

import { nodeInterface } from '../nodeDefinitions';

import { attributeFields } from 'graphql-sequelize';

import models from '../../source/models';

const carType = new GraphQLObjectType({
    name: "CarType",
    description: "Car",
    fields: () => ({
        ...attributeFields(models.car, {
            only: ['id', 'brand', 'power', 'carCode'],
            globalId: true,
            allowNull: true
        }),
        distributor: {
            name: "Distributor",
            description: "Dodavatelia auta",
            type: new GraphQLList(distributorType),
            resolve: (root) => {
                return root.getDistributors();
            }
        }
    }),
    interfaces:  [nodeInterface]
});

export default carType;