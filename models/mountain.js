'use strict';

const { Model, Op } = require('sequelize');
const { trailStatuses, highestPeak } = require('../helpers/category');

module.exports = (sequelize, DataTypes) => {
  class Mountain extends Model {
    static associate(models) {
      // One to Many
      Mountain.belongsTo(models.User, { foreignKey: 'userId' });
      Mountain.hasMany(models.Education, { foreignKey: 'mountainId', as: 'Educations' });
      Mountain.hasMany(models.Comment, { foreignKey: 'mountainId' });
      // Many to Many
      Mountain.belongsToMany(models.User, {
        through: models.MountainHistory,
        foreignKey: 'mountainId',
        otherKey: 'userId',
        as: 'Visitors'
      });
    }

    // static method: dipakai halaman daftar gunung untuk search + sort
    static async searchAndSort(keyword, sort) {
      const options = { include: [{ association: 'Educations' }] };

      if (keyword) {
        options.where = {
          [Op.or]: [
            { name: { [Op.iLike]: `%${keyword}%` } },
            { location: { [Op.iLike]: `%${keyword}%` } }
          ]
        };
      }

      if (sort === 'tertinggi') {
        options.order = [['height', 'DESC']];
      } else if (sort === 'terendah') {
        options.order = [['height', 'ASC']];
      } else if (sort === 'nama') {
        options.order = [['name', 'ASC']];
      } else {
        options.order = [['id', 'ASC']];
      }

      const mountains = await Mountain.findAll(options);
      return mountains;
    }

    // instance method
    difficulty() {
      if (this.height >= 3400) {
        return 'Sulit';
      } else if (this.height >= 2500) {
        return 'Menengah';
      }
      return 'Pemula';
    }

    // getter
    get heightFormatted() {
      return `${this.height.toLocaleString('id-ID')} mdpl`;
    }

    // getter: posisi ketinggian gunung ini terhadap puncak tertinggi Indonesia
    get elevationPercent() {
      const percent = Math.round((this.height / highestPeak) * 100);
      return percent > 100 ? 100 : percent;
    }

    get shortHistory() {
      if (this.history.length <= 140) {
        return this.history;
      }
      return `${this.history.slice(0, 140)}...`;
    }
  }

  Mountain.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama gunung wajib diisi' },
        notEmpty: { msg: 'Nama gunung tidak boleh kosong' }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Lokasi gunung wajib diisi' },
        notEmpty: { msg: 'Lokasi gunung tidak boleh kosong' }
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Ketinggian wajib diisi' },
        isInt: { msg: 'Ketinggian harus berupa angka' },
        min: { args: [100], msg: 'Ketinggian minimal 100 mdpl' },
        max: { args: [5000], msg: 'Ketinggian maksimal 5000 mdpl' }
      }
    },
    history: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Narasi sejarah wajib diisi' },
        notEmpty: { msg: 'Narasi sejarah tidak boleh kosong' },
        len: { args: [30, 5000], msg: 'Narasi sejarah minimal 30 karakter' }
      }
    },
    funFact: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Fakta unik wajib diisi' },
        notEmpty: { msg: 'Fakta unik tidak boleh kosong' }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: { msg: 'Format URL gambar tidak valid' }
      }
    },
    trailStatus: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [trailStatuses],
          msg: `Status jalur harus ${trailStatuses.join(', ')}`
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mountain'
  });

  // hooks: rapikan penulisan nama & lokasi sebelum masuk database
  Mountain.beforeCreate((mountain) => {
    mountain.name = mountain.name.trim();
    mountain.location = mountain.location.trim();
    if (!mountain.imgUrl) {
      mountain.imgUrl = 'https://placehold.co/600x400/1f6feb/ffffff?text=Gunung';
    }
  });

  return Mountain;
};
