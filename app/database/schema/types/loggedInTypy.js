/**
 * Created by Jan on 23.8.2016.
 */
import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { attributeFields } from 'graphql-sequelize';

import { nodeInterface } from '../nodeDefinitions';

import {
  user
} from '../../source/models';

const loggedInType = new GraphQLObjectType({
  name: 'LoggedInType',
  description: 'Users in applications',
  fields: {
    ...attributeFields(user, {
      exclude: ['type', 'password', 'createdAt', 'updatedAt'],
      globalId: true,
      allowNull: true
    }),
    token: { type: GraphQLString }
  },
  interfaces: [nodeInterface]
});

export default loggedInType;
