import {
  getBoard,
  getRecentPlayers,
  getWaitTime,
  setCell,
  setPlayerTeam,
} from "./api.js";

let uid;

/**
 * Actualise le tableau de pixels
 */
const refreshGrid = async () => {
  let board = await getBoard().then((res) => res);
  let grid = document.querySelector(".view");
  grid.innerHTML = "";
  board.map((elem, rowIndex) => {
    let row = document.createElement("div");
    row.classList.add("row");
    grid.appendChild(row);
    elem.map((cell, colIndex) => {
      let c = document.createElement("div");
      c.classList.add("cell");
      row.appendChild(c);
      c.style.backgroundColor = cell;
      c.onclick = async () => {
        uid = document.querySelector("#uid-input").value;
        let color = document.querySelector("#color").value;
        setCell(uid, color, colIndex, rowIndex);
        setTimeout(() => refreshGrid(), 1000);
      };
    });
  });
};

/**
 * Mise à jour de l'équipe
 */
const teamButtons = async () => {
  const buttonDiv = document.querySelector(".team-select");
  const teamIDs = [1, 2, 3, 4];
  teamIDs.map((num) => {
    uid = document.querySelector("#uid-input").value;
    let btn = document.createElement("button");
    btn.textContent = `Équipe ${num}`;
    buttonDiv.appendChild(btn);
    btn.addEventListener("click", async (e) => {
      const team = await setPlayerTeam(num, uid);
      const result = await team;
    });
  });
};

/**
 * Actualise le tableau des actions récentes
 */
const recentActions = async () => {
  uid = document.querySelector("#uid-input").value;
  const tbody = document.querySelector(".tbody");
  if (uid !== "") {
    let req = await getRecentPlayers(uid);
    let result = await req;
    tbody.innerHTML = "";
    result.map((elem) => {
      const { nom, equipe, lastModificationPixel, banned } = elem;
      const row = createTableRow(nom, equipe, lastModificationPixel, banned);
      tbody.appendChild(row);
    });
  }
};

/**
 * Crée une ligne dans le tableau des actions récentes
 * @param {*} name Nom de l'utilisateur
 * @param {*} team Équipe de l'utilisateur
 * @param {*} lastModified Date de la modification
 * @param {*} banned Indique le statut de banissement de l'utilisateur
 * @returns Ligne du tableau
 */
const createTableRow = (name, team, lastModified, banned) => {
  const row = document.createElement("div");
  row.classList.add("tr");
  const nameDiv = document.createElement("div");
  const teamDiv = document.createElement("div");
  const lastModifiedDiv = document.createElement("div");
  const bannedDiv = document.createElement("div");
  nameDiv.textContent = name;
  teamDiv.textContent = team;
  lastModifiedDiv.textContent = lastModified;
  bannedDiv.textContent = banned;
  row.appendChild(nameDiv);
  row.appendChild(teamDiv);
  row.appendChild(lastModifiedDiv);
  row.appendChild(bannedDiv);
  return row;
};

/**
 * Rafraichît la page si l'UID est correct
 */
const pageRefresh = async () => {
  const waitP = document.querySelector("#wait-info");
  setInterval(async () => {
    uid = document.querySelector("#uid-input").value;
    if (uid !== "") {
      await refreshGrid();
      await getWaitTime(uid).then(
        (res) =>
          (waitP.textContent =
            res.tempsAttente === 0
              ? `Vous pouvez placer un pixel`
              : `Veuillez patienter ${Math.round(
                  res.tempsAttente / 1000
                )} secondes`)
      );
      await recentActions();
    }
  }, 2500);
};

/**
 * Fonction principale
 */
const main = async () => {
  await recentActions();
  await teamButtons();
  await pageRefresh();
};

main();
