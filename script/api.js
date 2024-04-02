let uid;
fetch("/script/env.json")
  .then((res) => res.json())
  .then((data) => (uid = data.uid));
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

export const getWaitTime = async () => {
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}temps-attente?uid=${uid}`, {
        method: "GET",
      });
      let response = await req.json();
      return response;
    } else {
      throw new Error("UID non renseigné");
    }
  } catch (e) {
    console.log(e);
  }
};

export const getTeam = async () => {
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}equipe-utilisateur?uid=${uid}`, {
        method: "GET",
      });
      let response = await req.json();
      return response;
    } else {
      throw new Error("UID non renseigné");
    }
  } catch (e) {
    console.log(e);
  }
};

export const getRecentPlayers = async () => {
  try {
    if (uid) {
      let req = await fetch(`${baseUrl}liste-joueurs?uid=${uid}`, {
        method: "GET",
      });
      let response = await req.json();
      return response;
    } else {
      throw new Error("UID non renseigné");
    }
  } catch (e) {
    console.log(e);
  }
};

const setPlayerTeam = async (teamNumber) => {
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
      throw new Error("Mauvaise reqûete");
    }
  } catch (error) {
    console.log(e);
  }
};

const setCell = async (color,col,row) =>{
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
      throw new Error("Mauvaise reqûete");
    }
  } catch (error) {
    console.log(e);
  }
}