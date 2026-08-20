'use strict';

module.exports = {
  async up(queryInterface) {
    const histories = [
      { userId: 2, mountainId: 1, status: 'Selesai Didaki' },
      { userId: 2, mountainId: 5, status: 'Terdaftar' },
      { userId: 3, mountainId: 2, status: 'Ingin Didaki' },
      { userId: 3, mountainId: 6, status: 'Selesai Didaki' }
    ];

    const comments = [
      { userId: 2, mountainId: 1, content: 'Materi soal Ranu Kumbolo membantu banget buat persiapan manajemen air.' },
      { userId: 3, mountainId: 1, content: 'Baru tahu kalau edelweis butuh belasan tahun buat tumbuh besar. Jangan dipetik ya teman-teman.' },
      { userId: 2, mountainId: 5, content: 'Info soal Owa Jawa menarik, semoga ditambah data waktu terbaik buat mengamatinya.' },
      { userId: 3, mountainId: 6, content: 'Golden sunrise Prau memang tidak berlebihan. Rekomendasi buat pendaki pemula.' }
    ];

    const historyData = histories.map((history) => {
      return { ...history, createdAt: new Date(), updatedAt: new Date() };
    });

    const commentData = comments.map((comment) => {
      return { ...comment, createdAt: new Date(), updatedAt: new Date() };
    });

    await queryInterface.bulkInsert('MountainHistories', historyData);
    await queryInterface.bulkInsert('Comments', commentData);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Comments', null, { truncate: true, restartIdentity: true, cascade: true });
    await queryInterface.bulkDelete('MountainHistories', null, { truncate: true, restartIdentity: true, cascade: true });
  }
};
