'use strict';

const { Model } = require('sequelize');
const { hikeStatuses } = require('../helpers/category');

module.exports = (sequelize, DataTypes) => {
  class MountainHistory extends Model {
    static associate(models) {
      MountainHistory.belongsTo(models.User, { foreignKey: 'userId' });
      MountainHistory.belongsTo(models.Mountain, { foreignKey: 'mountainId' });
    }

    // instance method dipakai untuk nominal invoice simaksi
    simaksiFee() {
      if (this.status === 'Selesai Didaki') {
        return 0;
      }
      return 25000;
    }
  }

  MountainHistory.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'User wajib diisi' }
      }
    },
    mountainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Gunung wajib dipilih' }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Status wajib diisi' },
        isIn: {
          args: [hikeStatuses],
          msg: `Status harus ${hikeStatuses.join(', ')}`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'MountainHistory'
  });

  return MountainHistory;
};
