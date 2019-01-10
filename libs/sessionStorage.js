const jwt = require('jsonwebtoken');

const secret = process.env.APP_SECRET;

function setSessionData(res, data) {
  const token = jwt.sign(data, secret);

  res.cookie('token', token, {maxAge: 3600000, httpOnly: true});
}

function getSessionData(req) {
  const token = req.cookies.token;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
}

module.exports = {
  setSessionData,
  getSessionData
};
