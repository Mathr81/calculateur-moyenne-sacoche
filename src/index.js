const login = require("./functions/login");
const { listEvaluations, viewEvaluation } = require("./functions/evaluation");

let total = 0;
let count = 0;

const jeton =
  "7463iazxUqo50bOFrKLF9w1TW59sdvtkJ78j87PAGhxSUKJqjVd2O1z3mgPXHVnflS6Cy";

const equivalents = [5, 10, 15, 20];
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

async function calculerMoyenne(startDate, endDate) {
  console.log("Calcul de la moyenne...");

  try {
    await askAPI("login", jeton);
    const evaluations = await askAPI(
      "lister_evaluations",
      jeton,
      startDate,
      endDate,
    );

    for (const evaluation of evaluations.data) {
      const saisies = await askAPI(
        "voir_saisies_evaluation",
        jeton,
        evaluation.id,
      );

      for (const saisie of Object.values(saisies.data.item)) {
        if (!saisie.note) {
          console.log(`Note manquante pour l'évaluation ${evaluation.id}`);
          continue;
        }
        const note = parseInt(saisie.note);
        if (!note) {
          console.log(`Note invalide pour l'évaluation ${evaluation.id}`);
          continue;
        }
        const equivalentNote = equivalents[note - 1];
        console.log(`Equivalent de la note ${note} : ${equivalentNote}`);
        ajouterNote(equivalentNote);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

let idx = 1;
const year = "2024";
for (let i = 0; i < 5; i++) {
  if (idx < 10) {
    calculerMoyenne(`01/0${idx}/${year}`, `01/0${idx + 1}/${year}`);
  } else {
    calculerMoyenne(`01/${idx}/${year}`, `01/${idx + 1}/${year}`);
  }
}
