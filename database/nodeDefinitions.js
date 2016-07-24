/**
 * Created by Jan on 19.7.2016.
 */
import {
    nodeDefinitions,
    fromGlobalId
} from 'graphql-relay';

// --------------------------- zmena zdroju z natvrdo napisanych dat na databazu
import cars from './cars';
import bikes from './bikes';
import contractors from './contractors';
// ---------------------------

const { nodeField, nodeInterface } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);
        switch (type) {
            case 'carType':
                //return _.find(cars, { 'id': id }); with lodash
                return cars.find(c => c.id == id); // with array.find
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
                return require('./types/carType').default;
            case 'motorka':
                return require('./types/bikeType').default;
            case 'dodavatel':
                return require('./types/contractorType').default;
        }
    }
);

export { nodeField, nodeInterface };