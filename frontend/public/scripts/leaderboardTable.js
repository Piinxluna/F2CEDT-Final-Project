import { callGetLeaderboardAPI } from './api.js'

/** @typedef {import("./config.js").Leaderboard} Leaderboard */

export async function showLeaderboard(level) {
	const table = document.getElementById('leaderboardTableBody')
	let leaderboard = await callGetLeaderboardAPI(level)

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
