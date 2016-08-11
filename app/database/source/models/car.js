/**
 * Created by Jan on 30.7.2016.
 */
export default function (sequelize, dt) {
  const model = sequelize.define('car', {
    type: {
      type: new dt.VIRTUAL(dt.STRING),
      get() {
        return 'auto';
      }
    },
    brand: {
      type: dt.STRING
    },
    power: {
      type: dt.STRING
    },
    carCode: {
      type: dt.INTEGER
    }
  }, {
    classMethods: {
      associate(models) {
        model.hasMany(models.distributor, { foreignKey: 'carCode' });
      }
    }
  });
  return model;
}
