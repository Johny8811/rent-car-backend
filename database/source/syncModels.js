/**
 * Created by Jan on 31.7.2016.
 */
import Sequelize from 'sequelize';
import Conn from './database';
import Bike from './models/bike';
import Car from './models/car';
import Contractor from './models/contractor';

const Bikes = Bike(Conn, Sequelize);
const Cars = Car(Conn, Sequelize);
const Contractors = Contractor(Conn, Sequelize);

Cars.hasMany(Contractors);

//Conn.sync({force: true}).then(() => {
//    return Cars.create({
//        mark: "Audi",
//        power: "560"
//    }).then((cars)=> {
//        return cars.createContractor({
//           mark: "Audi",
//            contractor: "Peto Vesely"
//        });
//    });
//}).then(() => {
//    return Cars.create({
//        mark: "BMW",
//        power: "200"
//    }).then((cars)=> {
//        return cars.createContractor({
//            mark: "BMW",
//            contractor: "Rich Fritz"
//        });
//    });
//}).then(() => {
//    return Cars.create({
//        mark: "Lamborghini",
//        power: "700"
//    }).then((cars)=> {
//        return cars.createContractor({
//            mark: "Lambo",
//            contractor: "Itall Mislo"
//        });
//    });
//});

export default Conn;