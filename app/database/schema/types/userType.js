/**
 * Created by Jan on 23.8.2016.
 */
import {
  GraphQLObjectType
} from 'graphql';

import { attributeFields } from 'graphql-sequelize';

import { nodeInterface } from '../nodeDefinitions';

import {
  user
} from '../../source/models';

const userType = new GraphQLObjectType({
  name: 'UserType',
  description: 'Users in applications',
  fields: attributeFields(user, {
    exclude: ['type', 'password', 'createdAt', 'updatedAt'],
    globalId: true,
    allowNull: true
  }),
  interfaces: [nodeInterface]
});

export default userType;
