'use strict';

const { Comment } = require('../models');

class CommentController {
  static async addComment(req, res) {
    try {
      const { content } = req.body;

      await Comment.create({
        userId: req.session.userId,
        mountainId: req.params.id,
        content
      });

      const pesan = 'Komentar berhasil dikirim';
      res.redirect(`/mountains/${req.params.id}?notif=${pesan}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map((err) => err.message);
        return res.redirect(`/mountains/${req.params.id}?error=${messages.join(', ')}`);
      }
      res.render('error', { message: error.message });
    }
  }
  static async editForm(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);

      res.render('formComment', {
        comment,
        error: req.query.error,
        session: req.session
      });
    } catch (error) {
      res.render('error', { message: error.message });
    }
  }

  static async editPost(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      await comment.update({ content: req.body.content });

      const pesan = 'Komentar berhasil diperbarui';
      res.redirect(`/mountains/${comment.mountainId}?notif=${pesan}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map((err) => err.message);
        return res.redirect(`/comments/${req.params.id}/edit?error=${messages.join(', ')}`);
      }
      res.render('error', { message: error.message });
    }
  }
  static deleteComment(req, res) {
    let mountainId = '';

    Comment.findByPk(req.params.id)
      .then((comment) => {
        mountainId = comment.mountainId;
        return Comment.destroy({ where: { id: req.params.id } });
      })
      .then(() => {
        const pesan = 'Komentarmu berhasil dihapus';
        res.redirect(`/mountains/${mountainId}?notif=${pesan}`);
      })
      .catch((error) => {
        res.redirect(`/mountains?error=${error.message}`);
      });
  }
}

module.exports = CommentController;
