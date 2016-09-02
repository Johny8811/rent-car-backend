/**
 * Created by Jan on 23.8.2016.
 */
import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { attributeFields } from 'graphql-sequelize';

import { nodeInterface } from '../nodeDefinitions';

import models from '../../source/models';

const loggedInType = new GraphQLObjectType({
  name: 'LoggedInType',
  description: "Users in applications",
  fields: {
    ...attributeFields(models.user, {
    only: ['id', 'firstname', 'lastname', 'username', 'email', 'password', 'role'],
    globalId:true,
    allowNull:true
    }),
    token: { type: GraphQLString }
  },
  interfaces: [nodeInterface]
});

export default loggedInType;