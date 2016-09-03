/**
 * Created by Jan on 27.7.2016.
 */
import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  mutationWithClientMutationId,
  offsetToCursor
} from 'graphql-relay';

import bcrypt from 'bcrypt-nodejs';

import { GraphQLUserEdge } from '../types/connections/userConnection';
import viewerType from '../types/viewerType';

import {
  user
} from '../../source/models';

const registerMutation = mutationWithClientMutationId({
  name: 'Register',
  inputFields: {
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    passwordHash: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    userEdge: {
      type: GraphQLUserEdge,
      resolve: (payload) => user.findAll().then(users => ({
        // funkcia cursorForObjectInConnection bolanahradena offsetToCursor
        // issue: https://github.com/graphql/graphql-relay-js/issues/29
        // treba pozret ako funguje cursorForObjectInConnection a hned
        // je jasne kde nastava problem, objekty sa nezhodujú
        cursor: offsetToCursor(users.length - 1),
        node: payload
      }))
    },
    viewer: {
      type: viewerType,
      resolve(root, args, context) {
        return context;
      }
    }
  },
  mutateAndGetPayload({ firstname, lastname, username, email, passwordHash }) {
    const password = bcrypt.hashSync(passwordHash);
    return user.create({
      firstname,
      lastname,
      username,
      email,
      password
    });
  }
});

export default registerMutation ;
