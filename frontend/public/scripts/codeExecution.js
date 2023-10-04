import { callGetNewLevelAPI, callPostNewScoreAPI } from './api.js'
import {
	changeDirection,
	displayPos,
	hideBabyDuck,
	isSamePoint,
	setUpMap,
	resizeMap,
} from './duckMove.js'
/** @typedef {import("./config.js").Level} Level */

var duckPic = document.getElementById('mom-duck-pic')
var goal = [0, 0]
var startPos = []
var startDir = 0
var babyDuckPos = []
var mapArray = []
var codeGuide = {}
let exportedCodeGuide

var dir = 0 // 1 = Up, 2 = Right, 3 = Down, 4 = Left
var pos = [0, 0]
var nextPos = []
var inputInd = 0
var codeLists = []

var star = 0

// Get map size
const mapBackground = document.getElementById('map-background')
var mapSize = 0
var blockSize = 0
var mapPos = []

let resizeObserver = new ResizeObserver(() => {
	mapSize = mapBackground.width
	blockSize = mapSize / mapArray.length
	mapPos[0] = mapBackground.offsetTop
	mapPos[1] = mapBackground.offsetLeft
	resizeMap(mapPos, blockSize, pos, babyDuckPos)
})
resizeObserver.observe(mapBackground)

export function addInputLine() {
	const codeInput = document.getElementById('code-input')

	if (codeInput.children.length > codeGuide.codeLimit - 1) {
		alert('เพิ่มโค้ดเต็มจำนวนแล้ว!')
	} else {
		inputInd++
		const newdropdown = document.createElement('div')
		let optionHTML = `<h6 class="space"></h6>`
		optionHTML += `<label for="movement-${inputInd}" class="order-dropdown"> ${inputInd} : </label>`
		optionHTML += `<select id="movement-${inputInd}" class="dropdown-select" onchange="checkFor(this,${exportedCodeGuide})">
    <option disabled>-Choose Option-</option>`
		for (let option of codeGuide.choice) {
			optionHTML += `<option value="${option}" class="dropdown-choice">${option}()</option>`
		}
		optionHTML += `</select>`
		newdropdown.innerHTML = optionHTML
		newdropdown.setAttribute('id', `movement-div-${inputInd}`)
		codeInput.appendChild(newdropdown)
	}
}

export function deleteInputLine() {
	if (inputInd > 1) {
		let lastLine = document.getElementById(`movement-div-${inputInd}`)
		lastLine.remove()
		inputInd--
	}
}

export async function runCode() {
	setUpMap(mapPos, blockSize, pos, dir, babyDuckPos)

	// get arrays from codeInput field
	codeLists = []
	for (let i = 1; i <= inputInd; i++) {
		let input = document.getElementById(`movement-${i}`)
		if (input.value === 'for') {
			let conditionValue = document.getElementById(`condition-value-${i}`)
			let forCodeInput = document.getElementById(`for-code-input-${i}`)
			let codeInput = []
			for (let j = 1; j <= forCodeInput.children.length; j++) {
				console.log(i, j)
				let forInput = document.getElementById(`for-${i}-movement-${j}`)
				console.log(forInput.value)
				if (forInput.value === 'for') {
					let conditionValue2 = document.getElementById(`condition-value2-${j}`)
					let forCodeInput2 = document.getElementById(
						`for2-code-input-${i}-${j}`
					)
					let codeInput2 = []
					for (let k = 1; k <= forCodeInput2.children.length; k++) {
						console.log(i, j)
						let forInput = document.getElementById(
							`for2-${i}-${j}-movement-${k}`
						)
						console.log(forInput)
						codeInput2.push(forInput.value)
					}
					codeInput.push({
						name: input.value,
						condition: conditionValue2.value,
						forInput: codeInput2,
					})
				} else {
					codeInput.push(forInput.value)
				}
			}
			codeLists.push({
				name: input.value,
				condition: conditionValue.value,
				forInput: codeInput,
			})
		} else {
			codeLists.push(input.value)
		}
	}
	console.log(codeLists)
	// codeLists = [
	// 	'walk',
	// 	'jump',
	// 	'turn left',
	// 	'walk',
	// 	'jump',
	// 	'walk',
	// 	'turn left',
	// 	'walk',
	// 	'walk',
	// 	'walk',
	// ]
	var result = await calcResult(codeLists)
	star = result.babyCollected
	showStar('level', star)
	toFinalPage(result)
}

export async function calcResult(codeLists) {
	var babyCollected = 0
	var errorWalk = 0
	var isPass = false
	var isError = false
	var errorRes = 'เดินไปไม่ถึงอ่า T^T'
	for (let data of codeLists) {
		isError = false
		if (data.name == 'for') {
			for (let i = 0; i < data.condition; i++) {
				for (let forInput of data.forInput) {
					if (forInput.name == 'for') {
						for (let i = 0; i < forInput.condition; i++) {
							for (let forInput2 of forInput.forInput) {
								await runCommand(forInput2)
							}
						}
					} else {
						await runCommand(data)
					}
				}
			}
		} else {
			await runCommand(data)
		}

		for (let i in babyDuckPos) {
			if (isSamePoint(pos, babyDuckPos[i])) {
				babyCollected++
				hideBabyDuck(babyDuckPos[i], babyDuckPos)
			}
		}
		console.log(pos, errorWalk)

		if (isError == true) {
			errorWalk++
			await displayPos(
				duckPic,
				pos.map(x => x * blockSize),
				mapPos
			)
		} else {
			errorWalk = 0
		}

		if (isSamePoint(pos, goal)) {
			// Walk to finish point
			isPass = true
			break
		} else if (errorWalk > 3) {
			errorRes = 'เดินไปทางนั้นไม่ได้อ่ะ T^T'
			break
		}
	}
	return { errorRes, isPass, babyCollected }

	// ---------- functions used to calcResult ----------
	function nextTarget(i) {
		if (dir == 1) {
			nextPos = [pos[0] - i, pos[1]]
		} else if (dir == 2) {
			nextPos = [pos[0], pos[1] + i]
		} else if (dir == 3) {
			nextPos = [pos[0] + i, pos[1]]
		} else if (dir == 4) {
			nextPos = [pos[0], pos[1] - i]
		}
	}

	function getPosData(pos) {
		if (
			pos[0] < 0 ||
			pos[1] < 0 ||
			pos[0] >= mapArray.length ||
			pos[1] >= mapArray.length
		) {
			return null
		} else {
			return mapArray[pos[0]][pos[1]]
		}
	}

	async function runCommand(data) {
		if (data == 'walk') {
			await walk()
		} else if (data == 'jump') {
			await jump()
		} else if (data == 'turn left') {
			await turn(-1)
		} else if (data == 'turn right') {
			await turn(1)
		}
	}

	async function walk() {
		nextTarget(1)
		if (getPosData(nextPos) == '-') {
			pos = nextPos
			await displayPos(
				duckPic,
				pos.map(x => x * blockSize),
				mapPos
			)
		} else {
			isError = true
		}
	}

	async function jump() {
		nextTarget(1)
		if (getPosData(nextPos) == 'r') {
			nextTarget(2)
			pos = nextPos
			await displayPos(
				duckPic,
				pos.map(x => x * blockSize),
				mapPos
			)
		} else {
			isError = true
		}
	}

	async function turn(newDir) {
		// 1 = Up, 2 = Right, 3 = Down, 4 = Left
		dir += newDir
		if (dir == 0) {
			dir = 4
		} else if (dir == 5) {
			dir = 1
		}
		await changeDirection(dir)
	}
}
export async function showOldLevel() {
	pos = startPos
	dir = startDir
	setUpMap(mapPos, blockSize, startPos, startDir, babyDuckPos)
}

export async function showNewLevel(levelNumber) {
	let newLev = await callGetNewLevelAPI(levelNumber)

	//change level number
	document.getElementById(
		'levelNum'
	).textContent = `Level ${newLev.levelNumber}`

	//change mapfile
	document.getElementById('map-background').src = `${newLev.mapFile}`

	//change hint
	document.getElementById('hintContent').textContent = `${newLev.hint}`

	//change map array
	mapArray = newLev.mapArray
	codeGuide = newLev.codeGuide
	exportedCodeGuide = `{ choice: ['${codeGuide.choice[0]}'`
	for (let i = 1; i < codeGuide.choice.length; i++) {
		exportedCodeGuide += `, '${codeGuide.choice[i]}'`
	}
	exportedCodeGuide += `], forLimit: ${codeGuide.forLimit}, forNum: ${codeGuide.forNum} }`

	startPos = newLev.momDuckStartPos
	pos = startPos

	startDir = newLev.momDuckStartDir
	dir = startDir

	goal = newLev.goalPos

	for (let i = 0; i < newLev.babyDuckPos.length; i++) {
		babyDuckPos[i] = newLev.babyDuckPos[i]
	}

	// Setting up size
	mapSize = mapBackground.width
	blockSize = mapSize / mapArray.length
	mapPos[0] = mapBackground.offsetTop
	mapPos[1] = mapBackground.offsetLeft

	setUpMap(mapPos, blockSize, startPos, dir, babyDuckPos)

	const codeInput = document.getElementById('code-input')
	codeInput.innerHTML = ''
	inputInd = 0
	codeLists = []
	addInputLine() // Call function show code input
}

export async function showStar(type, levelScore) {
	const star1 = document.getElementById(type + '-star1')
	const star2 = document.getElementById(type + '-star2')
	const star3 = document.getElementById(type + '-star3')
	if (levelScore === 1) {
		star1.style.display = 'inline-block'
		star2.style.display = 'none'
		star3.style.display = 'none'
	} else if (levelScore === 2) {
		star1.style.display = 'inline-block'
		star2.style.display = 'inline-block'
		star3.style.display = 'none'
	} else if (levelScore === 3) {
		star1.style.display = 'inline-block'
		star2.style.display = 'inline-block'
		star3.style.display = 'inline-block'
	} else if (levelScore === 0) {
		star1.style.display = 'none'
		star2.style.display = 'none'
		star3.style.display = 'none'
	}
}

export async function toFinalPage(res) {
	const finPage = document.getElementById('gameOver')
	finPage.style.display = 'block'

	const winPage = document.getElementById('win')
	const losePage = document.getElementById('lose')

	if (res.isPass == true) {
		winPage.style.display = 'block'
		losePage.style.display = 'none'
		showStar('result', res.babyCollected)
	} else {
		winPage.style.display = 'none'
		losePage.style.display = 'block'
		document.getElementById('error-message').innerText = res.errorRes
	}
}

export async function postScore(name) {
	await callPostNewScoreAPI(name, star, codeLists.length)
}
