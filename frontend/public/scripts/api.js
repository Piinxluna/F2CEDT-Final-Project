// This is api
import { BACKEND_URL } from './config.js'

/** @typedef {import("./config.js").Level} Level */
/** @typedef {import("./config.js").Leaderboard} Leaderboard */

// Level number is old level
export async function callGetNewLevelAPI(levelNumber) {
	// for test only
	// return {
	// 	levelNumber: 1,
	// 	mapFile: './src/map_level1.png',
	// 	mapArray: [
	// 		['-', '-', '-', '-', '-'],
	// 		['-', '-', 'r', '-', '-'],
	// 		['-', '-', 'x', '-', 'r'],
	// 		['-', '-', 'x', 'r', '-'],
	// 		['-', 'r', 'x', 'x', '-'],
	// 	],
	// 	momDuckStartPos: [4, 4],
	// 	babyDuckPos: [
	// 		[1, 3],
	// 		[3, 0],
	// 		[1, 1],
	// 	],
	// 	goalPos: [4, 0],
	// 	codeGuide: {
	// 		choice: ['walk', 'jump', 'turn left', 'turn right', 'for'],
	// 		codeLimit: 20,
	// 		forLimit: 5,
	// 		forNum: 2,
	// 	},
	// 	hint: 'Test',
	// 	momDuckStartDir: 1,
	// }

	/** @type {Level[]} */
	const newLevel = await fetch(
		`${BACKEND_URL}/getNewLevel/${levelNumber}`
	).then(r => r.json())
	return newLevel[0]
}

export async function callPostNewScoreAPI(name, star, inputNum) {
	try {
		const response = await fetch(`${BACKEND_URL}/leaderboard`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				star: star,
				inputNum: inputNum,
			}),
		})

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`)
		}

		const result = await response.json()
		return result
	} catch (err) {
		console.log(err)
	}
}

export async function callGetLeaderboardAPI() {
	/** @type {Leaderboard[]} */
	const leaderboard = await fetch(`${BACKEND_URL}/leaderboard`).then(r =>
		r.json()
	)
	return leaderboard
}
