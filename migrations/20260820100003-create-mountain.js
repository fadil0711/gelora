'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mountains', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { allowNull: false, type: Sequelize.STRING },
      location: { allowNull: false, type: Sequelize.STRING },
      height: { allowNull: false, type: Sequelize.INTEGER },
      history: { allowNull: false, type: Sequelize.TEXT },
      funFact: { allowNull: false, type: Sequelize.TEXT },
      imgUrl: { type: Sequelize.STRING },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Mountains');
  }
};
