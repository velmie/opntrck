let request = require('request-promise')

const BASE_URL = 'https://apis.live.net/v5.0';

function me(accessToken) {
  return request.get(BASE_URL + '/me', {
    json: true,
    qs: {
      access_token: accessToken
    }
  })
}

module.exports = {
  me
};
