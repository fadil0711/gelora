'use strict';

const { Model } = require('sequelize');
const { categoryNames, toneOf } = require('../helpers/category');

module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    static associate(models) {
      Education.belongsTo(models.Mountain, { foreignKey: 'mountainId' });
    }

    // getter: warna badge diambil dari konfigurasi category.json
    get badgeColor() {
      return `badge-${toneOf(this.category)}`;
    }
  }

  Education.init({
    mountainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Gunung wajib dipilih' }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Kategori wajib diisi' },
        isIn: { args: [categoryNames], msg: `Kategori harus salah satu dari ${categoryNames.join(', ')}` }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Judul materi wajib diisi' },
        notEmpty: { msg: 'Judul materi tidak boleh kosong' }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Isi materi wajib diisi' },
        notEmpty: { msg: 'Isi materi tidak boleh kosong' }
      }
    }
  }, {
    sequelize,
    modelName: 'Educations'
  });

  return Education;
};
