/**
 * Created by Jan on 23.8.2016.
 */
import {
  GraphQLObjectType
} from 'graphql';

import { attributeFields } from 'graphql-sequelize';

import { nodeInterface } from '../nodeDefinitions';

import models from '../../source/models';

const userType = new GraphQLObjectType({
  name: 'UserType',
  description: "Users in applications",
  fields: attributeFields(models.user, {
    only: ['id', 'firstname', 'lastname', 'username', 'email', 'password', 'role'],
    globalId: true,
    allowNull: true
  }),
  interfaces: [nodeInterface]
});

export default userType;