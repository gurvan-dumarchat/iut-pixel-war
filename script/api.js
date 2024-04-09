const baseUrl = "https://pixel-api.codenestedu.fr/";

/**
 * Fetches the color board from the API
 */
export const getBoard = async () => {
  let req = await fetch(`${baseUrl}tableau`, {
    method: "GET",
  });
  let response = await req.json();
  return response;
};

export const getWaitTime = async (uid) => {
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}temps-attente?uid=${uid}`, {
        method: "GET",
      });
      let response = await req.json();
      return response;
    } else {
      alert("UID non renseigné")
    }
  } catch (e) {
    console.log(e);
  }
};

export const getTeam = async (uid) => {
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}equipe-utilisateur?uid=${uid}`, {
        method: "GET",
      });
      let response = await req.json();
      return response;
    } else {
      alert("UID non renseigné");
    }
  } catch (e) {
    console.log(e);
  }
};

export const getRecentPlayers = async (uid) => {
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}liste-joueurs?uid=${uid}`, {
        method: "GET",
      });
      let response = await req.json();
      return response;
    } else {
      alert("UID non renseigné");
    }
  } catch (e) {
    console.log(e);
  }
};

export const setPlayerTeam = async (teamNumber,uid) => {
  const data = {
    uid: uid,
    nouvelleEquipe: teamNumber,
  };
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}choisir-equipe`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers:{
          "accept":"application/json",
          "Content-Type":"application/json"
        }
      });
      let response = await req.json();
      return response;
    } else {
      alert("Mauvaise reqûete");
    }
  } catch (error) {
    console.log(error);
  }
};

export const setCell = async (uid,color,col,row) =>{
  const data = {
    uid: uid,
    color: color,
    col:col,
    row,row
  };
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}modifier-case`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers:{
          "accept":"application/json",
          "Content-Type":"application/json"
        }
      });
      let response = await req.json();
      return response;
    } else {
      alert("Mauvaise reqûete");
    }
  } catch (error) {
    console.log(e);
  }
}