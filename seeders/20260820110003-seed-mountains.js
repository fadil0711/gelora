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
        imgUrl: 'https://akcdn.detik.net.id/visual/2021/12/09/gunung-semeru-2_11.jpeg?w=720&q=90',
        trailStatus: 'Buka Terbatas',
        userId: 1
      },
      {
        name: 'Gunung Rinjani',
        location: 'Lombok, Nusa Tenggara Barat',
        height: 3726,
        history: 'Rinjani terbentuk dari sisa letusan dahsyat Gunung Samalas pada 1257 Masehi yang dampaknya tercatat di lapisan es Greenland dan Antartika. Letusan itu meninggalkan kaldera besar yang kini berisi Danau Segara Anak. Masyarakat Sasak dan umat Hindu Lombok menganggap danau ini tempat suci untuk upacara Mulang Pekelem.',
        funFact: 'Di tengah Danau Segara Anak muncul anak gunung bernama Barujari yang masih aktif dan terus tumbuh setiap letusan.',
        imgUrl: 'https://cdn.antaranews.com/cache/1200x800/2025/06/28/1000407980.jpg',
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
        imgUrl: 'https://awsimages.detik.net.id/community/media/visual/2019/03/08/96d60356-f54f-4b9d-a5af-4cbc8c24f3c7_43.jpeg?w=1200',
        trailStatus: 'Buka',
        userId: 1
      },
      {
        name: 'Gunung Gede',
        location: 'Cianjur & Bogor, Jawa Barat',
        height: 2958,
        history: 'Gunung Gede bersama Pangrango menjadi kawasan konservasi tertua di Indonesia sejak Kebun Raya Cibodas dibangun pada 1830. Naturalis seperti Junghuhn dan Wallace pernah meneliti hutan pegunungannya. Statusnya naik menjadi taman nasional pada 1980 dan menjadi salah satu laboratorium alam paling lengkap di Jawa.',
        funFact: 'Alun-alun Suryakencana seluas 50 hektare dipenuhi bunga edelweis yang mekar serentak sekitar bulan Juli hingga Agustus.',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSSa5cCyXILvgb-oyHwF5KmhVC6oRXka6qpWEI0j8317vOJG4AhcAkxw&s=10',
        trailStatus: 'Buka',
        userId: 1
      },
      {
        name: 'Gunung Prau',
        location: 'Dieng, Jawa Tengah',
        height: 2590,
        history: 'Prau berada di dataran tinggi Dieng yang sudah menjadi pusat peradaban Hindu tertua di Jawa sejak abad ke-7, dibuktikan candi-candi kelompok Arjuna di kakinya. Punggungan Prau dulunya adalah ladang kentang warga sebelum dikembangkan menjadi jalur wisata pendakian sejak 2010-an.',
        funFact: 'Bukit Teletubbies di puncak Prau adalah titik terbaik melihat deretan Sindoro, Sumbing, Merbabu, dan Merapi dalam satu bingkai.',
        imgUrl: 'https://zjglidcehtsqqqhbdxyp.supabase.co/storage/v1/object/public/atourin/images/destination/wonosobo/gunung-prau-profile1640531301.png?x-image-process=image/resize,p_100,limit_1/imageslim',
        trailStatus: 'Buka',
        userId: 1
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
