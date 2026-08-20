'use strict';

// sumber tunggal untuk kategori materi & pilihan status, dibaca dari category.json
const catalog = require('../category.json');

const educationCategories = catalog.educationCategories;
const categoryNames = educationCategories.map((category) => category.name);
const trailStatuses = catalog.trailStatuses;
const hikeStatuses = catalog.hikeStatuses;
const highestPeak = catalog.highestPeak;

function toneOf(categoryName) {
  const found = educationCategories.find((category) => category.name === categoryName);
  return found ? found.tone : 'sky';
}

module.exports = {
  educationCategories,
  categoryNames,
  trailStatuses,
  hikeStatuses,
  highestPeak,
  toneOf
};
