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
    case 'viewer':
      return { type: 'viewer' };
    case 'user':
      return models.user.findById(id);
    case 'car':
      return models.car.findById(id);
    case 'bike':
      return models.bike.findById(id);
    case 'distributor':
      return models.distributor.findById(id);
    default: {
      return null;
    }
  }
};

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
