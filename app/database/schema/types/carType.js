/**
 * Created by Jan on 19.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLList
} from 'graphql';

import { attributeFields } from 'graphql-sequelize';

import distributorType from './distributorType';

import { nodeInterface } from '../nodeDefinitions';

import models from '../../source/models';

const carType = new GraphQLObjectType({
  name: 'CarType',
  description: 'Car',
  fields: () => ({
    ...attributeFields(models.car, {
      only: ['id', 'brand', 'power', 'carCode'],
      globalId: true,
      allowNull: true
    }),
    distributor: {
      name: 'Distributor',
      description: 'Dodavatelia auta',
      type: new GraphQLList(distributorType),
      resolve: (root) => root.getDistributors()
    }
  }),
  interfaces: [nodeInterface]
});

export default carType;
