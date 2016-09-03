/**
 * Created by Jan on 25.7.2016.
 */
import {
    fromGlobalId
} from 'graphql-relay';

import {
  user,
  car,
  bike,
  distributor
} from '../source/models';

/**
 * funkcia na ziskanie dat podla 'type' a 'id'
 *
 * @param globalId
 * @returns {*}
 */

const apiToGetDataFromTyepAndID = (globalId) => {
  const { type, id } = fromGlobalId(globalId);
  switch (type) {
    case 'viewer':
      return { type: 'viewer' };
    case 'user':
      return user.findById(id);
    case 'car':
      return car.findById(id);
    case 'bike':
      return bike.findById(id);
    case 'distributor':
      return distributor.findById(id);
    default: {
      return null;
    }
  }
};

/**
 * funkcia na ziskanie GraphQType-u z objektu, ktorý dostala
 *
 * @param objType
 * @returns {*}
 */

const apiToGetGraphQLObjectType = (objType) => {
  const {
    viewerType,
    userType,
    bikeType,
    carType,
    distributorType
  } = require('./types/index');

  switch (objType) {
    case 'viewer':
      return viewerType.default;
    case 'uzivatel':
      return userType.default;
    case 'motorka':
      return bikeType.default;
    case 'auto':
      return carType.default;
    case 'dodavatel':
      return distributorType.default;
    default: {
      return null;
    }
  }
};

export { apiToGetDataFromTyepAndID, apiToGetGraphQLObjectType };
