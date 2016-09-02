/**
 * Created by Jan on 31.7.2016.
 */
// import bcrypt from 'bcrypt-nodejs';
// import { sequelize, user, bike, car, distributor } from './models';

//  sequelize.sync({ force: true })
//
//  .then(() => {
//  return user.bulkCreate([
//    { firstname: 'Jan', lastname: 'Ban', username: 'janci', email: 'jan@ban.com', password: password, role: 'reader' },
//    { firstname: 'Semir', lastname: 'Gerkan', username: 'IronMan', email: 'jan@ban.com', password: password, role: 'publisher' },
//    { firstname: 'Majk', lastname: 'Spirit', username: 'Lajk', email: 'majk@spit.com', password: password, role: 'admin' }
//  ]);
//  })
//
//  .then(() => {
//  return bike.bulkCreate([
//    { brand: 'Yamaha', volume: 1550, maxSpeed: '150' },
//    { brand: 'Ducati', volume: 2000, maxSpeed: '250' },
//    { brand: 'Honda', volume: 1280, maxSpeed: '200' }
//  ]);
//  })
//
//  .then(() => {
//  return car.bulkCreate([
//    { brand: 'Audi', power: '450', carCode: 1 },
//    // { brand: "Audiii", power: "150", carCode: 1 },
//    { brand: 'BMW', power: '300', carCode: 2 },
//    { brand: 'Mercedes', power: '610', carCode: 3 }
//  ]);
//  })
//
//  .then(() => {
//  return distributor.bulkCreate([
//    { brand: 'Audi', distributor: 'Peter Gren, Audi-Dist a.s.', carCode: 1 },
//    { brand: 'Audi', distributor: 'Anna Simonova, CArSide', carCode: 1 },
//    { brand: 'BMW', distributor: 'Karol Fritz, END.a.s', carCode: 2 },
//    { brand: 'Mercedes', distributor: 'Paul Kurl, Mercedes-Banz Company', carCode: 3 }
//  ]);
//  });

import bcrypt from 'bcrypt-nodejs';
 import { sequelize, user, bike, car, distributor } from './models';

  const password = bcrypt.hashSync('password');

  sequelize.sync({ force: true })

  .then(() => {
  return user.bulkCreate([
    { firstname: 'Jan', lastname: 'Ban', username: 'janci', email: 'jan@ban.com', password: password, role: 'reader' },
    { firstname: 'Semir', lastname: 'Gerkan', username: 'IronMan', email: 'jan@ban.com', password: password, role: 'publisher' },
    { firstname: 'Majk', lastname: 'Spirit', username: 'Lajk', email: 'majk@spit.com', password: password, role: 'admin' }
  ]);
  })

  .then(() => {
  return bike.bulkCreate([
    { brand: 'Yamaha', volume: 1550, maxSpeed: '150' },
    { brand: 'Ducati', volume: 2000, maxSpeed: '250' },
    { brand: 'Honda', volume: 1280, maxSpeed: '200' }
  ]);
  })

  .then(() => {
  return car.bulkCreate([
    { brand: 'Audi', power: '450', carCode: 1 },
    // { brand: "Audiii", power: "150", carCode: 1 },
    { brand: 'BMW', power: '300', carCode: 2 },
    { brand: 'Mercedes', power: '610', carCode: 3 }
  ]);
  })

  .then(() => {
  return distributor.bulkCreate([
    { brand: 'Audi', distributor: 'Peter Gren, Audi-Dist a.s.', carCode: 1 },
    { brand: 'Audi', distributor: 'Anna Simonova, CArSide', carCode: 1 },
    { brand: 'BMW', distributor: 'Karol Fritz, END.a.s', carCode: 2 },
    { brand: 'Mercedes', distributor: 'Paul Kurl, Mercedes-Banz Company', carCode: 3 }
  ]);
  });