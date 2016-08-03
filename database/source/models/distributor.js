/**
 * Created by Jan on 31.7.2016.
 */
export default function(sequelize, dt) {
    var model = sequelize.define('distributor', {
        type:{
            type: new dt.VIRTUAL(dt.STRING),
            get() {
                return 'dodavatel';
            }
        },
        brand: {
            type: dt.STRING
        },
        distributor: {
            type: dt.STRING
        },
        carCode: {
            type: dt.INTEGER
        }
    });
    return model;
};