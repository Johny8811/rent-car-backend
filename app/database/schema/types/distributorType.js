/**
 * Created by Jan on 24.7.2016.
 */
import {
    GraphQLObjectType
} from 'graphql';

import { attributeFields } from 'graphql-sequelize';

import { nodeInterface } from '../nodeDefinitions';

import {
  distributor
} from '../../source/models';

const distributorType = new GraphQLObjectType({
  name: 'DistributorType',
  description: 'Distributor of car',
  fields: attributeFields(distributor, {
    only: ['id', 'brand', 'distributor', 'carCode'],
    globalId: true
  }),
  interfaces: [nodeInterface]
});

export default distributorType;
