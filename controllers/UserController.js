'use strict';

const { User, Profile, Mountain, MountainHistory } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { formatDate, formatRupiah } = require('../helpers/formatter');
const { createSimaksiInvoice } = require('../helpers/invoice');

class UserController {
  static async landingPage(req, res) {
    try {
      const mountains = await Mountain.findAll({ order: [['height', 'DESC']], limit: 5 });
      const totalMountain = await Mountain.count();
      const totalUser = await User.count();

      res.render('landing', {
        mountains,
        totalMountain,
        totalUser,
        session: req.session
      });
    } catch (error) {
      res.render('error', { message: error.message });
    }
  }

  static registerForm(req, res) {
    res.render('register', { error: req.query.error, session: req.session });
  }

  static async registerPost(req, res) {
    try {
      const { username, email, password, fullName, bio, phone } = req.body;

      const newUser = await User.create({ username, email, password, role: 'user' });
      await Profile.create({ userId: newUser.id, fullName, bio, phone });

      const pesan = 'Registrasi berhasil, silakan login';
      res.redirect(`/login?notif=${pesan}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const messages = error.errors.map((err) => err.message);
        return res.redirect(`/register?error=${messages.join(', ')}`);
      }
      res.render('error', { message: error.message });
    }
  }

  static loginForm(req, res) {
    res.render('login', { error: req.query.error, notif: req.query.notif, session: req.session });
  }

  static async loginPost(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        const pesan = 'Email atau password salah';
        return res.redirect(`/login?error=${pesan}`);
      }

      const isValid = comparePassword(password, user.password);

      if (!isValid) {
        const pesan = 'Email atau password salah';
        return res.redirect(`/login?error=${pesan}`);
      }

      req.session.userId = user.id;
      req.session.role = user.role;
      req.session.username = user.username;

      res.redirect('/mountains');
    } catch (error) {
      res.render('error', { message: error.message });
    }
  }

  static logout(req, res) {
    req.session.destroy((error) => {
      if (error) {
        return res.render('error', { message: error.message });
      }
      res.redirect('/');
    });
  }

  static async profilePage(req, res) {
  try {
    const user = await User.findByPk(req.session.userId, {
      include: [
        { model: Profile },
        { model: Mountain }
      ]
    });

    const histories = await MountainHistory.findAll({
      where: { userId: req.session.userId },
      include: [
        { model: Mountain },
        { 
          model: User, 
          include: [{ model: Profile }] // ✅ Di-include agar data User & Profile tersedia di riwayat
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.render('profile', {
      user,
      histories,
      formatDate,
      formatRupiah,
      notif: req.query.notif,
      error: req.query.error,
      session: req.session
    });
  } catch (error) {
    console.log(error); // Untuk membantu lacak error di terminal jika ada
    res.render('error', { message: error.message });
  }
}
  static async addHistory(req, res) {
    try {
      const { status } = req.body;
      const mountainId = req.params.id;

      const existing = await MountainHistory.findOne({
        where: { userId: req.session.userId, mountainId }
      });

      if (existing) {
        await existing.update({ status });
      } else {
        await MountainHistory.create({ userId: req.session.userId, mountainId, status });
      }

      const pesan = 'Rencana pendakian berhasil disimpan';
      res.redirect(`/profile?notif=${pesan}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map((err) => err.message);
        return res.redirect(`/profile?error=${messages.join(', ')}`);
      }
      res.render('error', { message: error.message });
    }
  }
  static async downloadInvoice(req, res) {
    try {
      const history = await MountainHistory.findOne({
        where: { id: req.params.id, userId: req.session.userId },
        include: [
          { model: Mountain },
          { model: User, include: [{ model: Profile }] }
        ]
      });

      if (!history) {
        const pesan = 'Data pendakian tidak ditemukan';
        return res.redirect(`/profile?error=${pesan}`);
      }

      const pdfBuffer = await createSimaksiInvoice(history);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=simaksi-${history.id}.pdf`);
      res.send(pdfBuffer);
    } catch (error) {
      res.render('error', { message: error.message });
    }
  }
}

module.exports = UserController;
