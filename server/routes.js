const querystring = require('querystring');
const request = require('request'); // "Request" library
const app = require('./server.js');

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const clientId = process.env.SPOTIFY_CLIENT_ID; // Your client id
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri

app.get('/login', function (req, res) {

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'streaming user-read-email user-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      clientId: clientId,
      scope: scope,
      redirectUri: redirectUri,
      state: state
    }));
});

app.get('/callback', function (req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirectUri: redirectUri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' +
          (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        const accessToken = body.access_token,
          refreshToken = body.refresh_token;

        // we can also pass the token to the browser to make requests from there
        res.redirect('/listen' +
          querystring.stringify({
            access_token: accessToken,
            refresh_token: refreshToken
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function (req, res) {

  // requesting access token from refresh token
  const refreshToken = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' +
        (new Buffer(clientId + ':' + clientSecret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token;
      res.send({
        'access_token': accessToken
      });
    }
  });
});

app.get('/users', (req, res) => {
  res.json([{
    id: 1,
    username: 'wonipan'
  }]);
});
