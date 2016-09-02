/**
 * Created by Jan on 19.7.2016.
 */
import {
  GraphQLObjectType,
} from 'graphql';

import { attributeFields } from 'graphql-sequelize';

import { nodeInterface } from '../nodeDefinitions';

import models from '../../source/models';

const bikeType = new GraphQLObjectType({
  name: 'BikeType',
  description: 'Bike',
  fields: attributeFields(models.bike, {
    only: ['id', 'brand', 'volume', 'maxSpeed'],
    globalId: true,
    allowNull: true
  }),
  interfaces: [nodeInterface]
});

export default bikeType;
