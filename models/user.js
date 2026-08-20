'use strict';

const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: 'userId' });
      // One to Many
      User.hasMany(models.Mountain, { foreignKey: 'userId' });
      User.hasMany(models.Comment, { foreignKey: 'userId' });
      // Many to Many
      User.belongsToMany(models.Mountain, {
        through: models.MountainHistory,
        foreignKey: 'userId',
        otherKey: 'mountainId',
        as: 'VisitedMountains'
      });
    }
    isAdmin() {
      return this.role === 'admin';
    }
    get maskedEmail() {
      const parts = this.email.split('@');
      const front = parts[0].slice(0, 3);
      return `${front}***@${parts[1]}`;
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 30], msg: 'Username minimal 3 karakter' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email sudah terdaftar, silakan pakai email lain' },
      validate: {
        notNull: { msg: 'Email wajib diisi' },
        notEmpty: { msg: 'Email tidak boleh kosong' },
        isEmail: { msg: 'Format email tidak valid' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password wajib diisi' },
        notEmpty: { msg: 'Password tidak boleh kosong' },
        len: { args: [8, 100], msg: 'Password minimal 8 karakter' }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: { args: [['admin', 'user']], msg: 'Role harus admin atau user' }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  // hooks
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
    if (!user.role) {
      user.role = 'user';
    }
  });

  return User;
};
