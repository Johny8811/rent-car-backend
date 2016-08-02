/**
 * Created by Jan on 24.7.2016.
 */
import {
    connectionDefinitions,
} from 'graphql-relay';

import contractorType from '../contractorType';

var {connectionType: contractorConnection } =
    connectionDefinitions({ name: "Contractor", nodeType: contractorType });

export { contractorConnection };