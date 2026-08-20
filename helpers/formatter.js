'use strict';

// helper: format tanggal ke gaya Indonesia tanpa toISOString
function formatDate(date) {
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const tanggal = new Date(date);
  return `${tanggal.getDate()} ${bulan[tanggal.getMonth()]} ${tanggal.getFullYear()}`;
}

// helper: format angka jadi rupiah
function formatRupiah(number) {
  return `Rp ${number.toLocaleString('id-ID')}`;
}

// helper: ubah textarea multi baris jadi array bersih
function splitLines(text) {
  if (!text) {
    return [];
  }
  const lines = text.split('\n');
  const cleaned = lines.map((line) => line.trim());
  return cleaned.filter((line) => line.length > 0);
}

// helper: potong teks panjang untuk preview
function truncate(text, limit) {
  if (!text || text.length <= limit) {
    return text;
  }
  return `${text.slice(0, limit)}...`;
}

module.exports = { formatDate, formatRupiah, splitLines, truncate };
