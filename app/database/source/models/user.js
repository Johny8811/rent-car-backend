/**
 * Created by Jan on 31.7.2016.
 */
import bcrypt from 'bcrypt-nodejs';

export default function (sequelize, dt) {
  const model = sequelize.define('user', {
    type: {
      type: new dt.VIRTUAL(dt.STRING),
      get() {
        return 'uzivatel';
      }
    },
    firstname: {
      type: dt.STRING
    },
    lastname: {
      type: dt.STRING
    },
    username: {
      type: dt.STRING
    },
    email: {
      type: dt.STRING
    },
    password: {
      type: dt.STRING
    },
    role: {
      type: dt.STRING
    }
  }, {
    classMethods: {
      /**
       * prihlasovnie
       *
       * @param username
       * @param password
       * @returns {*}
       */
      login: (username, password) => model.findOne({ where: { username } })
        .then(user => {
          if (!user) {
            throw new Error('User with that username not found.');
          }
          return user;
        }).then(user => model.comparePassword(password, user.password).then(result => {
          if (result) {
            return user;
          }
        }, (err) => {
          throw new Error(err);
        })
      ),

      /**
       * porovnavanie hesiel
       *
       * @param password
       * @param passwordHash
       * @returns {Promise}
       */
      comparePassword: (password, passwordHash) => new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, match) => {
          if (err) reject(err);
          if (match) {
            resolve(match);
          } else {
            reject('Passwords don\'t match');
          }
        });
      })
    }
  });
  return model;
}
