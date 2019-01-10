const express = require('express');
const router = express.Router();

const renderError = require('../libs/renderError');
const contextio = require('../libs/contextio');
const microsoftLiveAPI = require('../libs/microsoftLiveAPI');
const sessionStorage = require('../libs/sessionStorage');
const microsoftAuth = require('../libs/microsoftAuth');


router.get('/', async function (routeReq, routeRes, next){
  if (!routeReq.query.code) {
    return renderError(new Error('Invalid OAuth Code!'), routeReq, routeRes);
  }

  try {
    const tokens = await microsoftAuth.getTokenFromCode(routeReq.query.code);
    let userData = await microsoftLiveAPI.me(tokens.access_token);

    const email = userData.emails.account;

    const contextUser = await contextio.createUser(tokens.refresh_token, email, userData.first_name, userData.last_name);

    console.log("User created");
    console.log(contextUser);

    sessionStorage.setSessionData(routeRes, {userId: contextUser.id});

    routeRes.redirect('/info');

  } catch (error) {
    return renderError(error, routeReq, routeRes);
  }
});

module.exports = router;
