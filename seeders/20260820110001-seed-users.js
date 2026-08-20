'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  async up(queryInterface) {
    const users = [
      { username: 'adminrangers', email: 'admin@gunungku.id', password: 'admin12345', role: 'admin' },
      { username: 'mikependaki', email: 'mike@gmail.com', password: 'mike12345', role: 'admin' },
      { username: 'sitirimba', email: 'siti@mail.com', password: 'siti123456', role: 'user' }
    ];

    const data = users.map((user) => {
      return {
        username: user.username,
        email: user.email,
        password: hashPassword(user.password),
        role: user.role,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    await queryInterface.bulkInsert('Users', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true });
  }
};
