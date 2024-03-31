const axiosInstance = require('./api');

async function listEvaluations(jeton, date_debut, date_fin) {
  try {
    const response = await axiosInstance.post('', {
      service: 'lister_evaluations',
      jeton: jeton,
      date_debut: date_debut,
      date_fin: date_fin
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
}

async function viewEvaluation(jeton, devoir_id) {
  try {
    const response = await axiosInstance.post('', {
      service: 'voir_saisies_evaluation',
      jeton: jeton,
      devoir_id: devoir_id
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
}

module.exports = {
  listEvaluations,
  viewEvaluation
};