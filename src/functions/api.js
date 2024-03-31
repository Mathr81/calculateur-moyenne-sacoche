const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://sacoche.sesamath.net/sacoche/api.php',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    charset: 'utf-8'
  }
});

module.exports = instance;