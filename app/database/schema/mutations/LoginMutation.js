/**
 * Created by Jan on 27.7.2016.
 */
import jwt from 'jsonwebtoken';

import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  mutationWithClientMutationId
} from 'graphql-relay';

import bcrypt from 'bcrypt-nodejs';

import secret from '../../../../config';

import loggedInType from '../types/loggedInTypy';

import models from '../../source/models';

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
  mutateAndGetPayload({ username, password }) {
    return ( models.user.findOne({ where: { username: username } })
      .then(user => {
        if (!user) {
          throw new Error('Bad user');
        } else if (!bcrypt.compareSync(password, user.password)) {
          throw new Error('Passwords don\'t match');
        } else {
          const signToken = jwt.sign({
            email: user.email,
            username: user.username,
            role: user.role
          }, secret, {
            expiresIn: 6000
          });
          user.token = signToken;
          return user;
        }
      })
    )
  }
});

export default loginMutation;
