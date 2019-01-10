const express = require('express');
const router = express.Router();
const contextio = require('../libs/contextio');

router.get('/', async function(req, res, next) {
  if (!req.isAuth) {
    res.redirect('/logout');
  }

  try {
    const userInfo = await contextio.userInfo(req.userId);
    console.log(userInfo);
    res.render('info', { user: userInfo });
  } catch (e) {
    res.redirect('/logout');
  }
});

module.exports = router;
