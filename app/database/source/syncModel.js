/**
 * Created by Jan on 31.7.2016.
 */
import { sequelize, bike, car, distributor } from './models';

sequelize.sync({ force: true }).then(() => {
  return bike.bulkCreate([
       { brand: 'Yamaha', volume: 1550, maxSpeed: '150' },
       { brand: 'Ducati', volume: 2000, maxSpeed: '250' },
       { brand: 'Honda', volume: 1280, maxSpeed: '200' }
  ]);
}).then(() => {
  return car.bulkCreate([
        { brand: 'Audi', power: '450', carCode: 1 },
        // { brand: "Audiii", power: "150", carCode: 1 },
        { brand: 'BMW', power: '300', carCode: 2 },
        { brand: 'Mercedes', power: '610', carCode: 3 }
  ]);
}).then(() => {
  return distributor.bulkCreate([
        { brand: 'Audi', distributor: 'Peter Gren, Audi-Dist a.s.', carCode: 1 },
        { brand: 'Audi', distributor: 'Anna Simonova, CArSide', carCode: 1 },
        { brand: 'BMW', distributor: 'Karol Fritz, END.a.s', carCode: 2 },
        { brand: 'Mercedes', distributor: 'Paul Kurl, Mercedes-Banz Company', carCode: 3 }
  ]);
});
