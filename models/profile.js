'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'userId' });
    }

    // getter
    get initial() {
      const words = this.fullName.split(' ');
      const letters = words.map((word) => word[0].toUpperCase());
      return letters.slice(0, 2).join('');
    }
  }

  Profile.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'User wajib diisi' }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama lengkap wajib diisi' },
        notEmpty: { msg: 'Nama lengkap tidak boleh kosong' }
      }
    },
    bio: DataTypes.TEXT,
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [9, 15], msg: 'Nomor HP antara 9 sampai 15 digit' }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile'
  });

  return Profile;
};
