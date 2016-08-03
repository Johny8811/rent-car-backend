/**
 * Created by Jan on 25.7.2016.
 */
import {
    fromGlobalId
} from 'graphql-relay';

import models from '../source/models';

const apiToGetDataFromTyepAndID = (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
        case 'viewerType':
            return { type: 'viewer' };
        case 'carType':
            return models.car.findById(id);
        case 'bikeType':
            return models.bike.findById(id);
        case 'distributorType':
            return models.distributor.findById(id);
    }
};

const apiToGetGraphQLObjectType = (objType) => {
    const {
        bikeType,
        carType,
        distributorType,
        viewerType
    } = require('./types');

    switch (objType) {
        case 'viewer':
            return viewerType.default;
        case 'motorka':
            return bikeType.default;
        case 'auto':
            return carType.default;
        case 'dodavatel':
            return distributorType.default;
    }
};

export { apiToGetDataFromTyepAndID, apiToGetGraphQLObjectType };