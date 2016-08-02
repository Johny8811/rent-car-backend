/**
 * Created by Jan on 25.7.2016.
 */
import {
    fromGlobalId
} from 'graphql-relay';

import Data from './source/syncModels';

const apiToGetDataFromTyepAndID = (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
        case 'viewerType':
            return { type: 'viewer' };
        case 'carType':
            return Data.models.car.findById(id);
        case 'bikeType':
            return Data.models.bike.findById(id);
        case 'contractorType':
            return Data.models.contractor.findById(id);
    }
};

const apiToGetGraphQLObjectType = (objType) => {
    const {
        bikeType,
        carType,
        contractorType,
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
            return contractorType.default;
    }
};

export { apiToGetDataFromTyepAndID, apiToGetGraphQLObjectType };