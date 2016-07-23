/**
 * Created by Jan on 28.6.2016.
 */
import _ from 'lodash';

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    globalIdField,
    nodeDefinitions,
    fromGlobalId
} from 'graphql-relay';

import { nodeField, nodeInterface } from './nodeDefinitions';


import bikeType from './types/bikeType';

import cars from "./cars";
import bikes from "./bikes";
import contractors from "./contractors";

//const { nodeField, nodeInterface } = nodeDefinitions(
//    (globalId) => {
//        const { type, id } = fromGlobalId(globalId);
//        switch (type) {
//            case 'carType':
//                //return _.find(cars, { 'id': id });
//                return cars.find(c => c.id == id);
//            case 'bikeType':
//                //return _.find(bikes, { 'id': id });
//                return bikes.find(b => b.id == id);
//            case 'contractorType':
//                //return _.find(bikes, { 'id': id });
//                return contractors.find(b => b.id == id);
//        }
//    },
//    (obj) => {
//        // GraphQLObjectType
//        switch (obj.graphql) {
//            case 'auto':
//                return carType; // GraphQLObjectType
//            case 'motorka':
//                return bikeType;
//            case 'dodavatel':
//                return contractorType;
//        }
//    }
//);
//
//const bikeType = new GraphQLObjectType({
//    name: "Bike",
//    description: "This is a bike",
//    fields: {
//        id: globalIdField('bikeType'),
//        brand: { type: GraphQLString },
//        objem: { type: GraphQLInt },
//        maxSpeed: { type: GraphQLString }
//    },
//    interfaces:  [nodeInterface]
//});

//console.log(nodeField);

const carType = new GraphQLObjectType({
    name: "Car",
    description: "This represent a car",
    fields: () => ({
        id: globalIdField('carType'),
        contractor: {
            name: "Contractor",
            description: "Dodavatelia auta",
            type: contractorConnection,
            args: connectionArgs,
            //resolve: (root) => contractors.find(con => con.id == root.id)
            resolve: (root, args) => connectionFromArray(contractors, args)
        },
        mark: { type: GraphQLString },
        power: { type: GraphQLString }
    }),
    interfaces:  [nodeInterface]
});


const contractorType = new GraphQLObjectType({
    name: "Contractor",
    description: "contractor of car",
    fields: {
        id: globalIdField('contractorType'),
        contractor: { type: GraphQLString }
    },
    interfaces:  [nodeInterface]
});

var {connectionType: contractorConnection } =
    connectionDefinitions({ name: "Contractor", nodeType: contractorType });

const viewerType = new GraphQLObjectType({
    name: 'Viewer',
    description: "Root field for Relay",
    fields: {
        cars: {
            type: new GraphQLList(carType),
            description: "Cars List",
            resolve: () => cars
        },
        bikes: {
            type: new GraphQLList(bikeType),
            description: "Bike List",
            resolve: () => bikes
        },
        node: nodeField
    }
});


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            viewer: {
                type: viewerType,
                resolve(root, args, context) {
                    return context;
                }
            }
        }
    })
});
export default schema;
