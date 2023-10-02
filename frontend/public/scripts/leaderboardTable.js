import { callGetLeaderboardAPI } from "./api.js";

/** @typedef {import("./config.js").Leaderboard} Leaderboard */
/** @typedef {import("./config.js").LeaderboardPayload} LeaderboardPayload */

/**
 * @param {Leaderboard[]} leaderboard
 */
function drawTable(leaderboard) {
  /** @type {HTMLTableSectionElement} */
  const table = document.getElementById("leaderboardTable");

  // Clear all elements
  table.innerHTML = "";
var count = 1;
  for (const item of leaderboard) {
    const row = table.insertRow();
    row.insertCell().innerText = count;
    row.insertCell().innerText = item.name;
    row.insertCell().innerText = item.star;
    row.insertCell().innerText = item.inputNum;
    count++;
  }
}

export async function fetchAndDrawTable() {
  const items = await callGetLeaderboardAPI();
  drawTable(items);
}
