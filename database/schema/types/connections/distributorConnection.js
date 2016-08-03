/**
 * Created by Jan on 24.7.2016.
 */
import {
    connectionDefinitions,
} from 'graphql-relay';

import distributorType from '../distributorType';

var {connectionType: distributorConnection } =
    connectionDefinitions({ name: "Distributor", nodeType: distributorType });

export { distributorConnection };