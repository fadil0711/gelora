'use strict';

module.exports = {
  async up(queryInterface) {
    const educations = [
      { mountainId: 1, category: 'Flora', title: 'Edelweis Jawa (Anaphalis javanica)', content: 'Tumbuh di Oro-oro Ombo dan Kalimati. Bunganya dilindungi dan dilarang dipetik karena butuh belasan tahun untuk tumbuh besar.' },
      { mountainId: 1, category: 'Fauna', title: 'Macan Tutul Jawa', content: 'Predator puncak yang masih terpantau kamera jebak di hutan Ranu Kumbolo. Populasinya sangat sedikit dan berstatus terancam punah.' },
      { mountainId: 1, category: 'Fakta Unik', title: 'Ranu Kumbolo dan Tanjakan Cinta', content: 'Danau di ketinggian 2.400 mdpl ini menjadi sumber air utama pendaki, dengan mitos Tanjakan Cinta yang melarang menoleh ke belakang.' },
      { mountainId: 2, category: 'Flora', title: 'Cemara Gunung (Casuarina junghuhniana)', content: 'Mendominasi jalur Sembalun dan tahan angin kencang serta suhu dingin di padang savana.' },
      { mountainId: 2, category: 'Fauna', title: 'Lutung Budeng', content: 'Primata berbulu hitam yang sering terlihat berkelompok di jalur Senaru saat pagi hari.' },
      { mountainId: 2, category: 'Fakta Unik', title: 'Air Panas Aik Kalak', content: 'Sumber air panas di tepi Segara Anak dipercaya warga memiliki khasiat penyembuhan.' },
      { mountainId: 3, category: 'Flora', title: 'Bunga Bangkai (Amorphophallus titanum)', content: 'Ditemukan di zona hutan hujan bawah Kerinci dan hanya mekar beberapa hari sekali dalam beberapa tahun.' },
      { mountainId: 3, category: 'Fauna', title: 'Harimau Sumatra', content: 'Kerinci Seblat adalah kantong populasi harimau sumatra terbesar yang tersisa di dunia.' },
      { mountainId: 3, category: 'Fakta Unik', title: 'Danau Gunung Tujuh', content: 'Danau kaldera tertinggi di Asia Tenggara berada di ketinggian sekitar 1.950 mdpl, bertetangga dengan Kerinci.' },
      { mountainId: 4, category: 'Flora', title: 'Rumput Merakan', content: 'Rumput savana Bromo yang berubah warna keemasan saat musim kemarau.' },
      { mountainId: 4, category: 'Fauna', title: 'Elang Jawa', content: 'Raptor endemik yang menjadi inspirasi lambang Garuda dan bersarang di tebing kaldera.' },
      { mountainId: 4, category: 'Fakta Unik', title: 'Upacara Yadnya Kasada', content: 'Setiap bulan Kasada, warga Tengger melarung hasil bumi ke kawah sebagai bentuk syukur.' },
      { mountainId: 5, category: 'Flora', title: 'Rasamala (Altingia excelsa)', content: 'Pohon raksasa penopang hutan Cibodas yang tingginya bisa mencapai 40 meter.' },
      { mountainId: 5, category: 'Fauna', title: 'Owa Jawa', content: 'Primata endemik Jawa Barat yang suaranya terdengar dari jalur Cibodas pada pagi hari.' },
      { mountainId: 5, category: 'Fakta Unik', title: 'Air Terjun Cibeureum', content: 'Berjarak sekitar satu jam dari pintu Cibodas dan bisa dikunjungi tanpa mendaki sampai puncak.' },
      { mountainId: 6, category: 'Flora', title: 'Bunga Daisy Liar', content: 'Menutupi punggungan Prau saat musim penghujan berakhir dan menjadi ciri khas bukit Teletubbies.' },
      { mountainId: 6, category: 'Fauna', title: 'Burung Cikrak Kutub', content: 'Burung kecil pemakan serangga yang aktif di semak-semak jalur Patak Banteng.' },
      { mountainId: 6, category: 'Fakta Unik', title: 'Golden Sunrise Dieng', content: 'Matahari terbit di Prau disebut golden sunrise karena cahaya keemasannya memantul di lautan awan Dieng.' }
    ];

    const data = educations.map((education) => {
      return { ...education, createdAt: new Date(), updatedAt: new Date() };
    });

    await queryInterface.bulkInsert('Educations', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Educations', null, { truncate: true, restartIdentity: true, cascade: true });
  }
};
