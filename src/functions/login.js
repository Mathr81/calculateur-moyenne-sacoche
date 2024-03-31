const axiosInstance = require('./api');

async function login(jeton) {
  try {
    const response = await axiosInstance.post('', {
      service: 'login',
      jeton: jeton
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
}

module.exports = login;