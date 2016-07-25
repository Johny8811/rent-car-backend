/**
 * Created by Jan on 19.7.2016.
 */
import {
    nodeDefinitions,
    fromGlobalId
} from 'graphql-relay';

import { apiTypeToGraphQLType } from './utils';

// --------------------------- zmena zdroju z natvrdo napisanych dat na databazu
import cars from './cars';
import bikes from './bikes';
import contractors from './contractors';
// ---------------------------


const { nodeField, nodeInterface } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);
        switch (type) {
            case 'viewerType':
                //return _.find(cars, { 'id': id }); with lodash
                return { graphql: 'viewer' };
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
    (obj) =>
    {
        return apiTypeToGraphQLType(obj.graphql);
    }

);

export { nodeField, nodeInterface };