const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  if (req.isAuth) {
    res.redirect('/info');
  }
  res.render('index', { title: 'Opentrack' , isAuth: req.isAuth });
});

module.exports = router;
