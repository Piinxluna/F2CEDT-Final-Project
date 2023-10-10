function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time))
}

export async function movingElement(el, start, des) {
	x1 = start[0]
	y1 = start[1]
	x2 = des[0]
	y2 = des[1]
	var pos = start
	diff = abs(x1 - x2) + abs(y1 - y2)
	for (let i = 0; i < diff; i++) {
		el.style.left = pos.left + x + 'px'
		el.style.top = pos.top + y + 'px'
		pos.left += x
		pos.top += y
	}
}

export function setUpMap(mapPos, blockSize, startPos, dir, babyDuckPos) {
	let duckPic = document.getElementById('mom-duck-pic')
	//change mom duck direction
	changeDirection(dir)

	//change mom duck position
	duckPic.height = blockSize
	duckPic.width = blockSize
	displayPos(
		duckPic,
		startPos.map(x => x * blockSize),
		mapPos
	)
	duckPic.style.display = 'block'

	//change baby duck position
	for (let i = 0; i < babyDuckPos.length; i++) {
		let babyDuck = document.getElementById('baby-duck-pic-' + i)
		babyDuck.height = blockSize
		babyDuck.width = blockSize
		displayPos(
			babyDuck,
			babyDuckPos[i].map(x => x * blockSize),
			mapPos
		)
		babyDuck.style.display = 'block'
	}
}

export function resizeMap(mapPos, blockSize, pos, babyDuckPos) {
	//change mom duck position
	let duckPic = document.getElementById('mom-duck-pic')
	duckPic.height = blockSize
	duckPic.width = blockSize
	displayPos(
		duckPic,
		pos.map(x => x * blockSize),
		mapPos
	)

	//change baby duck position
	for (let i = 0; i < babyDuckPos.length; i++) {
		let babyDuck = document.getElementById('baby-duck-pic-' + i)
		babyDuck.height = blockSize
		babyDuck.width = blockSize
		displayPos(
			babyDuck,
			babyDuckPos[i].map(x => x * blockSize),
			mapPos
		)
	}
}

export async function displayPos(el, pos, mapPos) {
	el.style.top = mapPos[0] + pos[0] + 'px'
	el.style.left = mapPos[1] + pos[1] + 'px'
	await delay(750)
}

export function isSamePoint(pos1, pos2) {
	if (pos1[0] == pos2[0] && pos1[1] == pos2[1]) {
		return true
	} else {
		return false
	}
}

export async function changeDirection(dir) {
	let duckPic = document.getElementById('mom-duck-pic')
	let newPic
	if (dir == 1) {
		newPic = './src/momDuck_up.GIF'
	} else if (dir == 2) {
		newPic = './src/momDuck_right.GIF'
	} else if (dir == 3) {
		newPic = './src/momDuck_down.GIF'
	} else if (dir == 4) {
		newPic = './src/momDuck_left.GIF'
	}
	duckPic.src = newPic
	await delay(750)
}

export function hideBabyDuck(thisBaby, babyDuckPos) {
	for (let i = 0; i < babyDuckPos.length; i++) {
		let babyDuck = document.getElementById('baby-duck-pic-' + i)
		if (isSamePoint(babyDuckPos[i], thisBaby)) {
			babyDuck.style.display = 'none'
		}
	}
}
