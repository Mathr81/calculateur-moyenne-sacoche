const login = require('./functions/login');
const { listEvaluations, viewEvaluation } = require('./functions/evaluation');

let total = 0;
let count = 0;

const jeton = "7463iG3A3kkLEggxHd7pyhK6uaw6lm9VP0Z8cQT0c5bMYqlaXWFhj1Lr2BJQDK59UYv24";

const equivalents = [5,10,15,20]
function ajouterNote(note) {
    total += note;
    count++;
    const moyenne = total / count;
    console.log(`Nouvelle note : ${note}`);
    console.log(`Moyenne actuelle : ${moyenne}`);
}

async function askAPI(service, jeton, devoir_id, date_debut, date_fin) {
  try {
    let response;
    switch (service) {
      case "login":
        response = await login(jeton);
        return response;
      case "lister_evaluations":
        response = await listEvaluations(jeton, date_debut, date_fin);
        return response;
      case "voir_saisies_evaluation":
        response = await viewEvaluation(jeton, devoir_id);
        return response;
    }
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
}

async function calculerMoyenne() {
    console.log("Calcul de la moyenne...");
  
    try {
      await askAPI("login", jeton);
      const evaluations = await askAPI("lister_evaluations", jeton, "01/02/2024", "10/03/2024");
  
      for (const evaluation of evaluations.data) {
        const saisies = await askAPI("voir_saisies_evaluation", jeton, evaluation.id);

        for (const saisie of Object.values(saisies.data.item)) {
            if (!saisie.note) {
                console.log(`Note manquante pour l'évaluation ${evaluation.id}`);
                continue;
            }
            const note = parseInt(saisie.note);
            const equivalentNote = equivalents[note - 1];
            console.log(`Equivalent de la note ${note} : ${equivalentNote}`);
            ajouterNote(equivalentNote);
          }
      }
    } catch (error) {
      console.error(error);
    }
  }

calculerMoyenne()