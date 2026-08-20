'use strict';

const express = require('express');
const session = require('express-session');
const router = require('./routers');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

app.use(session({
  secret: 'gunungku-rahasia',
  resave: false,
  saveUninitialized: false
}));

app.use(router);

app.use((req, res) => {
  res.status(404).render('error', { message: 'Halaman yang kamu cari tidak ditemukan' });
});

app.listen(port, () => {
  console.log(`GunungKu jalan di http://localhost:${port}`);
});
