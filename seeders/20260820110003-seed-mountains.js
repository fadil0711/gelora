'use strict';

module.exports = {
  async up(queryInterface) {
    const mountains = [
      {
        name: 'Gunung Semeru',
        location: 'Lumajang & Malang, Jawa Timur',
        height: 3676,
        history: 'Semeru dikenal sebagai puncak tertinggi di Pulau Jawa dan disebut Mahameru dalam naskah kuno Tantu Pagelaran. Naskah itu menceritakan pemindahan puncak Gunung Meru dari India untuk menstabilkan Pulau Jawa. Sejak zaman Majapahit kawasan ini dianggap sakral, dan sampai sekarang masyarakat Tengger masih menggelar upacara di sekitarnya. Jalur pendakian modern lewat Ranu Pani mulai populer sejak 1980-an.',
        funFact: 'Kawah Jonggring Saloka menyemburkan asap belerang hampir setiap 20 menit sekali, sehingga pendaki dilarang berada di puncak lewat pukul 10 pagi.',
        imgUrl: 'https://images.unsplash.com/photo-1650198147183-4a802821f1ed?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        trailStatus: 'Buka Terbatas',
        userId: 1
      },
      {
        name: 'Gunung Rinjani',
        location: 'Lombok, Nusa Tenggara Barat',
        height: 3726,
        history: 'Rinjani terbentuk dari sisa letusan dahsyat Gunung Samalas pada 1257 Masehi yang dampaknya tercatat di lapisan es Greenland dan Antartika. Letusan itu meninggalkan kaldera besar yang kini berisi Danau Segara Anak. Masyarakat Sasak dan umat Hindu Lombok menganggap danau ini tempat suci untuk upacara Mulang Pekelem.',
        funFact: 'Di tengah Danau Segara Anak muncul anak gunung bernama Barujari yang masih aktif dan terus tumbuh setiap letusan.',
        imgUrl: 'https://images.unsplash.com/photo-1654046920188-6e7ee051d7a4?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        trailStatus: 'Buka',
        userId: 1
      },
      {
        name: 'Gunung Kerinci',
        location: 'Kerinci, Jambi',
        height: 3805,
        history: 'Kerinci adalah gunung berapi tertinggi di Indonesia dan berada di jantung Taman Nasional Kerinci Seblat, warisan dunia UNESCO. Pendakian ilmiah pertama tercatat dilakukan oleh naturalis Belanda pada akhir abad ke-19 untuk memetakan flora hutan hujan Sumatra. Kawasan kaki gunung sudah lama menjadi lahan kebun teh Kayu Aro sejak masa kolonial.',
        funFact: 'Kerinci adalah satu-satunya gunung di Indonesia yang kawasannya masih menjadi habitat harimau sumatra liar.',
        imgUrl: 'https://tribratanews.polri.go.id/web/image/blog.post/63014/image',
        trailStatus: 'Buka',
        userId: 1
      },
      {
        name: 'Gunung Bromo',
        location: 'Probolinggo, Jawa Timur',
        height: 2329,
        history: 'Nama Bromo berasal dari kata Brahma, dewa pencipta dalam kepercayaan Hindu. Suku Tengger yang mendiami kawasan ini merupakan keturunan pelarian Majapahit dan masih memegang tradisi Yadnya Kasada, yaitu melarung hasil bumi ke kawah setiap tahun. Legenda Roro Anteng dan Joko Seger menjadi asal usul nama Tengger.',
        funFact: 'Lautan pasir seluas sekitar 10 kilometer persegi di sekitar Bromo adalah satu-satunya kaldera pasir yang dilindungi di Asia.',
        imgUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        trailStatus: 'Buka',
        userId: 1
      },
      {
        name: 'Gunung Gede',
        location: 'Cianjur & Bogor, Jawa Barat',
        height: 2958,
        history: 'Gunung Gede bersama Pangrango menjadi kawasan konservasi tertua di Indonesia sejak Kebun Raya Cibodas dibangun pada 1830. Naturalis seperti Junghuhn dan Wallace pernah meneliti hutan pegunungannya. Statusnya naik menjadi taman nasional pada 1980 dan menjadi salah satu laboratorium alam paling lengkap di Jawa.',
        funFact: 'Alun-alun Suryakencana seluas 50 hektare dipenuhi bunga edelweis yang mekar serentak sekitar bulan Juli hingga Agustus.',
        imgUrl: 'https://images.unsplash.com/photo-1724060973193-81445a37baaf?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        trailStatus: 'Buka',
        userId: 1
      },
      {
        name: 'Gunung Prau',
        location: 'Dieng, Jawa Tengah',
        height: 2590,
        history: 'Prau berada di dataran tinggi Dieng yang sudah menjadi pusat peradaban Hindu tertua di Jawa sejak abad ke-7, dibuktikan candi-candi kelompok Arjuna di kakinya. Punggungan Prau dulunya adalah ladang kentang warga sebelum dikembangkan menjadi jalur wisata pendakian sejak 2010-an.',
        funFact: 'Bukit Teletubbies di puncak Prau adalah titik terbaik melihat deretan Sindoro, Sumbing, Merbabu, dan Merapi dalam satu bingkai.',
        imgUrl: 'https://images.unsplash.com/photo-1724667523248-cb55bf707427?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        trailStatus: 'Buka',
        userId: 1
      },
      {
        name: 'Gunung Lawu',
        location: 'Karanganyar (Jawa Tengah) & Magetan (Jawa Timur)',
        height: 3265,
        history: 'Gunung Lawu memiliki ikatan sejarah yang sangat kuat dengan masa akhir Kerajaan Majapahit. Menurut tradisi lisan dan naskah Jawa, gunung ini menjadi tempat bertapa dan muksa Raja Brawijaya V setelah runtuhnya Majapahit. Di lerengnya terdapat candi-candi bercorak Hindu seperti Candi Cetho dan Candi Sukuh yang diperkirakan dibangun pada abad ke-15.',
        funFact: 'Memiliki warung tertinggi di Indonesia yaitu Warung Mbok Yem yang berada di pos Hargo Dumilah pada ketinggian sekitar 3.150 mdpl.',
        imgUrl: 'https://cdn.discordapp.com/attachments/1522482273943949433/1540051654316003349/image.png?ex=6a888c5f&is=6a873adf&hm=39e9ab0af818dddccbd26334f6425e8350417ec9e1c8a944740a0a7da897eed0&',
        trailStatus: 'Buka',
        userId: 1
      },
      {
        name: 'Gunung Jayawijaya',
        location: 'Kabupaten Puncak Jaya, Papua Tengah',
        height: 4884,
        history: 'Ditemukan pertama kali oleh penjelajah Belanda, Jan Carstenszoon, pada tahun 1623 yang melihat adanya gletser di daerah tropis dari pesisir pantai. Puncak resminya berhasil ditaklukkan pertama kali oleh tim ekspedisi yang dipimpin oleh pendaki asal Austria, Heinrich Harrer, pada tahun 1962.',
        funFact: 'Atap tertinggi di Nusantara yang masuk dalam daftar Seven Summits dunia dan merupakan satu-satunya tempat di Indonesia yang diselimuti salju abadi.',
        imgUrl: 'https://image.idn.media/post/20210225/puncak-jayawijaya-800x600-696x522-45618cd801e8a00eab7d1787c715feca-6df3513299c1c6479e2699d1842becb9.jpeg',
        trailStatus: 'Tutup',
        userId: 1,
      }
    ];

    const data = mountains.map((mountain) => {
      return { ...mountain, createdAt: new Date(), updatedAt: new Date() };
    });

    await queryInterface.bulkInsert('Mountains', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Mountains', null, { truncate: true, restartIdentity: true, cascade: true });
  }
};
