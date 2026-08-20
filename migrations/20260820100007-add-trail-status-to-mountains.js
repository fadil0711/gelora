'use strict';

// Migration tambahan: menambah kolom trailStatus + constraint default
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Mountains', 'trailStatus', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Buka'
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('Mountains', 'trailStatus');
  }
};
