const ContextIO = require('contextio');

const cioClient = ContextIO({
  key: process.env.CONTEXTIO_KEY,
  secret: process.env.CONTEXTIO_SECRET,
  version: "lite",
});


function createUser(refreshToken, email, firstName, lastName) {

  const data = {
    email: email,
    server: 'imap-mail.outlook.com',
    username: email,
    use_ssl: 1,
    port: 993,
    type: 'IMAP',
    provider_refresh_token: refreshToken,
    provider_consumer_key: process.env.MS_APP_ID,
  };

  if (firstName) {
    data.first_name = firstName;
  }

  if (lastName) {
    data.last_name = lastName;
  }

  return cioClient.users().post(data);
}

function userInfo(userId) {
  return cioClient.users(userId).get();
}

module.exports = {
  createUser,
  userInfo
};
