'use strict';

const { Model } = require('sequelize');
const { formatDate } = require('../helpers/formatter');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Mountain, { foreignKey: 'mountainId' });
    }
    isOwnedBy(userId) {
      return this.userId === userId;
    }
    get postedAt() {
      return formatDate(this.createdAt);
    }
  }

  Comment.init({
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Isi komentar wajib diisi' },
        notEmpty: { msg: 'Isi komentar tidak boleh kosong' },
        len: { args: [3, 500], msg: 'Komentar antara 3 sampai 500 karakter' }
      }
    }
  }, {
    sequelize,
    modelName: 'Comment'
  });

  return Comment;
};
