const { env } = require('process');

//const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:4315';
//const target = env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0];

const target = 'https://localhost:7107';

const PROXY_CONFIG = [
  {
    context: [
      "/home",
      "/timezone",
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
