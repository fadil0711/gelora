'use strict';

module.exports = {
  async up(queryInterface) {
    const profiles = [
      { userId: 1, fullName: 'Admin Rangers', bio: 'Pengelola konten edukasi pegunungan Indonesia.', phone: '081234567890' },
      { userId: 2, fullName: 'Mike Arteta', bio: 'Pendaki akhir pekan, suka gunung di Jawa Barat.', phone: '081298765432' },
      { userId: 3, fullName: 'Siti Rimba', bio: 'Pengamat flora fauna pegunungan.', phone: '081377788899' }
    ];

    const data = profiles.map((profile) => {
      return { ...profile, createdAt: new Date(), updatedAt: new Date() };
    });

    await queryInterface.bulkInsert('Profiles', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Profiles', null, { truncate: true, restartIdentity: true, cascade: true });
  }
};
