/**
 * Created by Jan on 31.7.2016.
 */
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
  });
  return model;
}
