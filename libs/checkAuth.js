const sessionStorage = require('../libs/sessionStorage');

function checkAuth(req, res, next) {

  console.log('Check Auth');

  const data = sessionStorage.getSessionData(req);

  if (data && data.userId) {
    req.userId = data.userId;
    req.isAuth = true;
  }

  next();
}

module.exports = checkAuth;
