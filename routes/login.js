const express = require('express');
const router = express.Router();
const microsoftAuth = require('../libs/microsoftAuth');

router.get('/', function(req, res, next) {
  res.redirect(microsoftAuth.getAuthUrl());
});

module.exports = router;
