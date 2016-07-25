/**
 * Created by Jan on 28.6.2016.
 */

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} from 'graphql';

import { nodeField } from './nodeDefinitions';

import viewerType from './types/viewerType';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            viewer: {
                type: viewerType,
                resolve(root, args, context) {
                    return context;
                }
            },
            node: nodeField
        }
    })
});
export default schema;
