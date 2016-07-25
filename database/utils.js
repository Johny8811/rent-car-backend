/**
 * Created by Jan on 25.7.2016.
 */

const apiTypeToGraphQLType = (objType) => {
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

export { apiTypeToGraphQLType };