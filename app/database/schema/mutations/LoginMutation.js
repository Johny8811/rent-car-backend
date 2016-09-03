/**
 * Created by Jan on 27.7.2016.
 */
import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  mutationWithClientMutationId
} from 'graphql-relay';

import jwt from 'jsonwebtoken';

import loggedInType from '../types/loggedInTypy';

import secret from '../../../../config';

import {
  user
} from '../../source/models';

const loginMutation = mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    loggedIn: {
      type: loggedInType,
      resolve(payload) {
        return payload;
      }
    }
  },
  mutateAndGetPayload: ({ username, password }) => user.login(username, password)
    .then(user => {
      const signToken = jwt.sign({
        email: user.email,
        username: user.username,
        role: user.role
      }, secret, {
        expiresIn: '1 day'
      });
      user.token = signToken;
      return user;
    })
});

export default loginMutation;
