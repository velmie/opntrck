const SCOPE = 'wl.emails wl.basic wl.imap wl.offline_access';
const REDIRECT_URI = process.env.APP_URL+'/oauth';

const credentials = {
  client: {
    id: process.env.MS_APP_ID,
    secret: process.env.MS_APP_SECRET,
  },
  /*auth: {
    tokenHost: 'https://login.microsoftonline.com',
    authorizePath: 'common/oauth2/v2.0/authorize',
    tokenPath: 'common/oauth2/v2.0/token'
  }*/
  auth: {
    tokenHost: 'https://login.live.com',
    authorizePath: 'oauth20_authorize.srf',
    tokenPath: 'oauth20_token.srf'
  },
  options: {
    authorizationMethod: 'body'
  }
};
const oauth2 = require('simple-oauth2').create(credentials);

module.exports.getAuthUrl =  function getAuthUrl() {
  const returnVal = oauth2.authorizationCode.authorizeURL({
    redirect_uri: REDIRECT_URI,
    scope: SCOPE
  });
  console.log(`Generated auth url: ${returnVal}`);
  return returnVal;
};

module.exports.getTokenFromCode =  async function getTokenFromCode(auth_code) {
  let result = await oauth2.authorizationCode.getToken({
    redirect_uri: REDIRECT_URI,
    code: auth_code,
  });

  const token = oauth2.accessToken.create(result);
  console.log('Token created: ', token.token);
  return token.token;
};
