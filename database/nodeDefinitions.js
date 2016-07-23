/**
 * Created by Jan on 19.7.2016.
 */
import {
    nodeDefinitions,
    fromGlobalId
} from 'graphql-relay';

import bikes from './bikes';

const { nodeField, nodeInterface } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);
        switch (type) {
            case 'carType':
                //return _.find(cars, { 'id': id });
                return cars.find(c => c.id == id);
            case 'bikeType':
                //return _.find(bikes, { 'id': id });
                return bikes.find(b => b.id == id);
            case 'contractorType':
                //return _.find(bikes, { 'id': id });
                return contractors.find(b => b.id == id);
        }
    },
    (obj) => {
        // GraphQLObjectType
        switch (obj.graphql) {
            case 'auto':
                return carType; // GraphQLObjectType
            case 'motorka':
                const bikeType = require('./types/bikeType');
                return bikeType;
            case 'dodavatel':
                return contractorType;
        }
    }
);
console.log(nodeField);
export { nodeField, nodeInterface };