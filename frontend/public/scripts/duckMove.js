function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time))
}

export async function testDelay() {
	await delay(1000)
	console.log('Test')
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

export async function setUpMap(blockSize, startPos, startDir, babyDuckPos) {
	//change mom duck direction

	//change mom duck position
	let duckPic = document.getElementById('mom-duck-pic')
	duckPic.height = blockSize
	duckPic.width = blockSize
	await displayPos(
		duckPic,
		startPos.map(x => x * blockSize),
		blockSize
	)

	//change baby duck position
	for (let i = 0; i < babyDuckPos.length; i++) {
		let babyDuck = document.getElementById('baby-duck-pic-' + i)
		babyDuck.height = blockSize
		babyDuck.width = blockSize
		babyDuck.style.display = 'block'
		displayPos(
			babyDuck,
			babyDuckPos[i].map(x => x * blockSize),
			blockSize
		)
	}
}

export async function displayPos(el, pos) {
	el.style.top = pos[0] + 'px'
	el.style.left = pos[1] + 'px'
	await delay(750)
}

export function isSamePoint(pos1, pos2) {
	if (pos1[0] == pos2[0] && pos1[1] == pos2[1]) {
		return true
	} else {
		return false
	}
}

export function hideBabyDuck(myPos, babyDuckPos) {
	for (let i = 0; i < babyDuckPos.length; i++) {
		let babyDuck = document.getElementById('baby-duck-pic-' + i)
		let pos = [babyDuck.offsetTop, babyDuck.offsetLeft]
		myPos = myPos.map(x => Math.floor(x))
		console.log(pos, myPos)
		if (isSamePoint(pos, myPos)) {
			babyDuck.style.display = 'none'
			console.log('hiding')
		}
	}
}
