'use strict';

const { Mountain, Education, Comment, User, Profile } = require('../models');
const { splitLines, formatDate } = require('../helpers/formatter');
const { educationCategories, trailStatuses, hikeStatuses } = require('../helpers/category');

class MountainController {
  static async listPage(req, res) {
    try {
      const { search, sort } = req.query;
      const mountains = await Mountain.searchAndSort(search, sort);

      res.render('mountains', {
        mountains,
        search,
        sort,
        notif: req.query.notif,
        error: req.query.error,
        session: req.session
      });
    } catch (error) {
      res.render('error', { message: error.message });
    }
  }
  static async detailPage(req, res) {
    try {
      const mountain = await Mountain.findByPk(req.params.id, {
        include: [
          { model: Education, as: 'Educations' },
          { model: User },
          { model: Comment, include: [{ model: User, include: [{ model: Profile }] }] }
        ],
        order: [[Comment, 'createdAt', 'DESC']]
      });

      if (!mountain) {
        const pesan = 'Data gunung tidak ditemukan';
        return res.redirect(`/mountains?error=${pesan}`);
      }

      const floras = mountain.Educations.filter((education) => education.category === 'Flora');
      const faunas = mountain.Educations.filter((education) => education.category === 'Fauna');
      const facts = mountain.Educations.filter((education) => education.category === 'Fakta Unik');

      res.render('detail', {
        mountain,
        floras,
        faunas,
        facts,
        formatDate,
        hikeStatuses,
        notif: req.query.notif,
        error: req.query.error,
        session: req.session
      });
    } catch (error) {
      res.render('error', { message: error.message });
    }
  }

  // CREATE
  static addForm(req, res) {
    res.render('formMountain', {
      mountain: null,
      trailStatuses,
      error: req.query.error,
      session: req.session
    });
  }

  static async addPost(req, res) {
    try {
      const { name, location, height, history, funFact, imgUrl, trailStatus, flora, fauna } = req.body;

      const mountain = await Mountain.create({
        name,
        location,
        height,
        history,
        funFact,
        imgUrl,
        trailStatus,
        userId: req.session.userId
      });

      const floraList = splitLines(flora);
      const faunaList = splitLines(fauna);

      const educations = [];

      floraList.map((item) => {
        const parts = item.split('|');
        return educations.push({
          mountainId: mountain.id,
          category: 'Flora',
          title: parts[0].trim(),
          content: parts[1] ? parts[1].trim() : 'Belum ada keterangan tambahan.'
        });
      });

      faunaList.map((item) => {
        const parts = item.split('|');
        return educations.push({
          mountainId: mountain.id,
          category: 'Fauna',
          title: parts[0].trim(),
          content: parts[1] ? parts[1].trim() : 'Belum ada keterangan tambahan.'
        });
      });

      if (educations.length > 0) {
        await Education.bulkCreate(educations, { validate: true });
      }

      const pesan = `${mountain.name} berhasil ditambahkan`;
      res.redirect(`/mountains?notif=${pesan}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map((err) => err.message);
        return res.redirect(`/mountains/add?error=${messages.join(', ')}`);
      }
      res.render('error', { message: error.message });
    }
  }
  static async editForm(req, res) {
    try {
      const mountain = await Mountain.findByPk(req.params.id);

      if (!mountain) {
        const pesan = 'Data gunung tidak ditemukan';
        return res.redirect(`/mountains?error=${pesan}`);
      }

      res.render('formMountain', {
        mountain,
        trailStatuses,
        error: req.query.error,
        session: req.session
      });
    } catch (error) {
      res.render('error', { message: error.message });
    }
  }

  static async editPost(req, res) {
    try {
      const { name, location, height, history, funFact, imgUrl, trailStatus } = req.body;

      await Mountain.update(
        { name, location, height, history, funFact, imgUrl, trailStatus },
        { where: { id: req.params.id }, individualHooks: true }
      );

      const pesan = 'Informasi gunung berhasil diperbarui';
      res.redirect(`/mountains/${req.params.id}?notif=${pesan}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map((err) => err.message);
        return res.redirect(`/mountains/${req.params.id}/edit?error=${messages.join(', ')}`);
      }
      res.render('error', { message: error.message });
    }
  }
  static deleteMountain(req, res) {
    let namaGunung = '';

    Mountain.findByPk(req.params.id)
      .then((mountain) => {
        if (!mountain) {
          throw new Error('Data gunung tidak ditemukan');
        }
        namaGunung = mountain.name;
        return Mountain.destroy({ where: { id: req.params.id } });
      })
      .then(() => {
        const pesan = `Data ${namaGunung} berhasil dihapus dari daftar`;
        res.redirect(`/mountains?notif=${pesan}`);
      })
      .catch((error) => {
        res.redirect(`/mountains?error=${error.message}`);
      });
  }
  static async addEducationForm(req, res) {
    try {
      const mountain = await Mountain.findByPk(req.params.id);

      if (!mountain) {
        const pesan = 'Data gunung tidak ditemukan';
        return res.redirect(`/mountains?error=${pesan}`);
      }

      res.render('formEducation', {
        mountain,
        educationCategories,
        error: req.query.error,
        session: req.session
      });
    } catch (error) {
      res.render('error', { message: error.message });
    }
  }

  static async addEducationPost(req, res) {
    try {
      const { category, title, content } = req.body;

      await Education.create({ mountainId: req.params.id, category, title, content });

      const pesan = `Temuan ${category} baru berhasil ditambahkan`;
      res.redirect(`/mountains/${req.params.id}?notif=${pesan}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map((err) => err.message);
        return res.redirect(`/mountains/${req.params.id}/educations/add?error=${messages.join(', ')}`);
      }
      res.render('error', { message: error.message });
    }
  }
}

module.exports = MountainController;
