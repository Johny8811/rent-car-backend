/**
 * Created by Jan on 31.7.2016.
 */
import { sequelize, bike, car, distributor } from './models';
sequelize.sync({force:true}).then(() => {
    return bike.create({
        brand: "Yamaha",
        volume: 1550,
        maxSpeed: "150"
    })
}).then(() => {
    return car.create({
        brand: "Audi",
        power: "400",
        carCode: 1
    })
}).then(() => {
    return distributor.create({
        brand: "Audi",
        distributor: "Fero Kli",
        carCode: 1
    })
});
