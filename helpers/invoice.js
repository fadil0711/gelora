'use strict';

// MVP (Minimal Valuable Package): easyinvoice
// dipakai untuk generate PDF invoice simaksi pendakian
const easyinvoice = require('easyinvoice');
const { formatDate } = require('./formatter');

async function createSimaksiInvoice(history) {
  const fee = history.simaksiFee();
  const nomor = `SIMAKSI-${String(history.id).padStart(4, '0')}`;

  const data = {
    apiKey: 'free',
    mode: 'development',
    images: {
      logo: 'https://placehold.co/200x60/1f6feb/ffffff?text=GunungKu'
    },
    sender: {
      company: 'GunungKu Education',
      address: 'Jl. Pendaki Raya No. 17',
      zip: '40115',
      city: 'Bandung',
      country: 'Indonesia'
    },
    client: {
      company: history.User.Profile ? history.User.Profile.fullName : history.User.username,
      address: history.Mountain.location,
      zip: '-',
      city: history.Mountain.name,
      country: 'Indonesia'
    },
    information: {
      number: nomor,
      date: formatDate(history.createdAt),
      'due-date': formatDate(history.updatedAt)
    },
    products: [
      {
        quantity: 1,
        description: `Simaksi Pendakian ${history.Mountain.name} (${history.Mountain.height} mdpl) - status ${history.status}`,
        'tax-rate': 0,
        price: fee
      }
    ],
    'bottom-notice': 'Dokumen ini adalah simulasi simaksi untuk keperluan edukasi. Selalu daftar resmi di balai taman nasional setempat.',
    settings: {
      currency: 'IDR',
      'margin-top': 25,
      'margin-right': 25,
      'margin-left': 25,
      'margin-bottom': 25
    },
    translate: {
      invoice: 'INVOICE SIMAKSI',
      number: 'Nomor',
      date: 'Tanggal Daftar',
      'due-date': 'Terakhir Diperbarui',
      products: 'Rincian',
      quantity: 'Jumlah',
      price: 'Harga',
      total: 'Total'
    }
  };

  const result = await easyinvoice.createInvoice(data);
  return Buffer.from(result.pdf, 'base64');
}

module.exports = { createSimaksiInvoice };
