import { callGetLeaderboardAPI, callGetNewLevelAPI } from './api.js'
// const { callGetLeaderboardAPI } = require('./api.js')

/** @typedef {import("./config.js").Leaderboard} Leaderboard */

export async function showLeaderboard() {
	const table = document.getElementById('leaderboardTableBody')
	let leaderboard = await callGetLeaderboardAPI()

	// Clear all elements
	table.innerHTML = ''
	var count = 1
	for (const item of leaderboard) {
		const row = table.insertRow()
		row.insertCell().innerText = count
		row.insertCell().innerText = item.name
		row.insertCell().innerText = item.star
		row.insertCell().innerText = item.inputNum
		count++
	}
}

export async function showNewLevel(levelNumber) {
	let newLev = await callGetNewLevelAPI(levelNumber)
	console.log(newLev)
}
