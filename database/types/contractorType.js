/**
 * Created by Jan on 24.7.2016.
 */
import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import {
    globalIdField
} from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';

const contractorType = new GraphQLObjectType({
    name: "ContractorType",
    description: "Contractor of car",
    fields: {
        id: globalIdField('contractorType'),
        mark: { type: GraphQLString },
        contractor: { type: GraphQLString }
    },
    interfaces:  [nodeInterface]
});

export default contractorType;