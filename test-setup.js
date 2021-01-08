process.env.NODE_ENV = 'development';

const dotenv = require('dotenv');

dotenv.config({
  path: `${__dirname}/.env`,
});

module.exports = dotenv;
