'use strict';

const { Comment } = require('../models');

function isLogin(req, res, next) {
  if (!req.session.userId) {
    const pesan = 'Masuk dulu untuk membuka halaman itu';
    return res.redirect(`/login?error=${pesan}`);
  }
  next();
}

function isAdmin(req, res, next) {
  if (req.session.role !== 'admin') {
    const pesan = 'Halaman ini hanya untuk admin ranger';
    return res.redirect(`/mountains?error=${pesan}`);
  }
  next();
}

async function isCommentOwner(req, res, next) {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.redirect(`/mountains?error=${'Komentar tidak ditemukan'}`);
    }

    if (!comment.isOwnedBy(req.session.userId)) {
      const pesan = 'Kamu hanya bisa mengubah atau menghapus komentarmu sendiri';
      return res.redirect(`/mountains/${comment.mountainId}?error=${pesan}`);
    }

    next();
  } catch (error) {
    res.render('error', { message: error.message });
  }
}

module.exports = { isLogin, isAdmin, isCommentOwner };
