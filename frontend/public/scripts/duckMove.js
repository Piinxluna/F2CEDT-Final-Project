var pos = {
  left: 0,
  top: 0,
};

export async function myMove(dir) {
  // dir <- direction
  const elem = document.getElementById("animate");
  if (dir == 1) {
    positionElement(elem, 0, 50);
  } else if (dir == -1) {
    positionElement(elem, 0, -50);
  } else if (dir == 2) {
    positionElement(elem, 50, 0);
  } else if (dir == -2) {
    positionElement(elem, -50, 0);
  }
}

export async function positionElement(el, x, y) {
  el.style.left = pos.left + x + "px";
  el.style.top = pos.top + y + "px";
  pos.left += x;
  pos.top += y;
}

export async function displayPos(el, pos, blockSize) {
  el.style.left = pos[0] + "px";
  el.style.top = pos[1] + "px";
}
