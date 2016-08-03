/**
 * Created by Jan on 31.7.2016.
 */
export default function(sequelize, dt) {
    var model = sequelize.define("bike", {
        type:{
            type: new dt.VIRTUAL(dt.STRING),
                get() {
                return 'motorka';
            }
        },
        brand: {
            type: dt.STRING
        },
        volume: {
            type: dt.INTEGER
        },
        maxSpeed: {
            type: dt.STRING
        }
    });
    return model;
};