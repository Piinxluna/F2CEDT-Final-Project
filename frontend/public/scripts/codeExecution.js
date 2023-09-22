import { callGetNewLevelAPI } from './api.js'
import { displayPos, hideBabyDuck, isSamePoint, setUpMap } from './duckMove.js'
/** @typedef {import("./config.js").Level} Level */

var duckPic = document.getElementById('mom-duck-pic')
var blockSize
var dir = 0 // 1 = Up, 2 = Right, 3 = Down, 4 = Left,
var goal = [0, 0]
var startPos = []
var babyDuckPos = []
var mapArray = []
var codeGuide = {}

var pos = [0, 0]
var nextPos = []
var inputInd = 1
var codeLists = []

export function addInputLine() {
	const codeInput = document.getElementById('code-input')

	if (codeInput.children.length > codeGuide.codeLimit - 1) {
		alert('เพิ่มโค้ดเต็มจำนวนแล้ว!')
	} else {
		inputInd++
		const newdropdown = document.createElement('div')
		let optionHTML = `<h6 class="space"></h6>`
		optionHTML += `<label for="movement-${inputInd}" class="order-dropdown"> ${inputInd} : </label>`
		optionHTML += `<select id="movement-${inputInd}" class="dropdown-select">
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
	setUpMap(blockSize, startPos, dir, babyDuckPos)

	// get arrays from codeInput field
	for (let i = 1; i <= inputInd; i++) {
		let input = document.getElementById(`movement-${i}`)
		codeLists.push(input.value)
	}
	console.log(codeLists)

	var result = await calcResult(codeLists)
	showStar('level', result.babyCollected)
	toFinalPage(result)

	inputInd = 1
	codeLists = []
	const codeInput = document.getElementById('code-input')
	codeInput.innerHTML = `
    <div id="movement-div-1">
      <label for="movement-1" class="order-dropdown"> 1 : </label>
      <select id="movement-1" class="dropdown-select">
        <option disabled>-Choose Option-</option>
        <option value="walk" class="dropdown-choice">walk()</option>
        <option value="jump" class="dropdown-choice">jump()</option>
        <option value="turn left" class="dropdown-choice">turn left()</option>
        <option value="turn right" class="dropdown-choice">turn right()</option>
      </select>
    </div>`
}

export async function calcResult(codeLists) {
	var babyCollected = 0
	var errorWalk = 0
	var isPass = false
	var isError = false
	var errorRes = 'เดินไปไม่ถึงอ่า T^T'
	for (let data of codeLists) {
		isError = false
		if (data == 'walk') {
			await walk()
		} else if (data == 'jump') {
			await jump()
		} else if (data == 'turn left') {
			turn(-1)
			// await turn(-1)
		} else if (data == 'turn right') {
			turn(1)
			// await turn(1)
		} else if (data.slice(0, 3) == 'for') {
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
				blockSize
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

	async function walk() {
		nextTarget(1)
		if (getPosData(nextPos) == '-') {
			pos = nextPos
			await displayPos(
				duckPic,
				pos.map(x => x * blockSize),
				blockSize
			)
		} else {
			isError = true
		}
	}

	async function jump() {
		nextTarget(1)
		if (getPosData(nextPos) == '-') {
			pos = nextPos
			await displayPos(
				duckPic,
				pos.map(x => x * blockSize),
				blockSize
			)
		} else if (getPosData(nextPos) == 'r') {
			nextTarget(2)
			pos = nextPos
			await displayPos(
				duckPic,
				pos.map(x => x * blockSize),
				blockSize
			)
		} else {
			isError = true
		}
	}

	function turn(newDir) {
		dir += newDir
		if (dir == 0) {
			dir = 4
		} else if (dir == 5) {
			dir = 1
		}
	}
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

	var mapSize = document.getElementById('map-background').clientWidth
	blockSize = mapSize / newLev.mapArray.length

	startPos = newLev.momDuckStartPos
	pos = startPos

	dir = newLev.momDuckStartDir
	goal = newLev.goalPos

	for (let i = 0; i < newLev.babyDuckPos.length; i++) {
		babyDuckPos[i] = newLev.babyDuckPos[i]
	}

	setUpMap(blockSize, startPos, dir, babyDuckPos)

	// Call function show code input
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
