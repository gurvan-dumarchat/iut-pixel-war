const baseUrl = "https://pixel-api.codenestedu.fr/";

/**
 * Récupération de la matrice de couleurs
 */
export const getBoard = async () => {
  let req = await fetch(`${baseUrl}tableau`, {
    method: "GET",
  });
  let response = await req.json();
  return response;
};

/**
 * Récupération du temps d'attente
 * @param {string} uid Identifiant de l'utilisateur
 * @returns Temps d'attente
 */
export const getWaitTime = async (uid) => {
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}temps-attente?uid=${uid}`, {
        method: "GET",
      });
      let response = await req.json();
      return response;
    }
  } catch (e) {
    console.log(e);
  }
};
/**
 * Récupération de l'équipe de l'utilisateur
 * @param {string} uid Identifiant de l'utilisateur
 * @returns Numéro d'équipe
 */
export const getTeam = async (uid) => {
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}equipe-utilisateur?uid=${uid}`, {
        method: "GET",
      });
      let response = await req.json();
      return response;
    }
  } catch (e) {
    console.log(e);
  }
};
/**
 * Récupération des actions récentes
 * @param {string} uid Identifiant de l'utilisateur
 * @returns Tableau d'actions récentes
 */
export const getRecentPlayers = async (uid) => {
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}liste-joueurs?uid=${uid}`, {
        method: "GET",
      });
      let response = await req.json();
      return response;
    }
  } catch (e) {
    console.log(e);
  }
};
/**
 * Change l'équipe du joueur
 * @param {number} teamNumber Numéro d'équipe
 * @param {string} uid Identifiant de l'utilisateur
 * @returns Résultat du changement d'équipe
 */
export const setPlayerTeam = async (teamNumber, uid) => {
  const data = {
    uid: uid,
    nouvelleEquipe: teamNumber,
  };
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}choisir-equipe`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let response = await req.json();
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * Changement d'une case de la matrice
 * @param {string} uid Identifiant de l'utilisateur
 * @param {string} color Couleur du nouveau pixel
 * @param {number} col Abscisse du nouveau pixel
 * @param {number} row Ordonnée du nouveau pixel
 * @returns Résultat du changement de pixel
 */
export const setCell = async (uid, color, col, row) => {
  const data = {
    uid: uid,
    color: color,
    col: col,
    row: row,
  };
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}modifier-case`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let response = await req.json();
      return response;
    }
  } catch (error) {
    console.log(e);
  }
};
