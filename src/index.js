import "./styles.scss";
import "./favicon.ico";

const fieldSize = {
    x: 4,
    y: 4
};
const fieldNode = document.getElementById("game-field");
const itemNodes = [];
for (let i = 1; i < fieldSize.x * fieldSize.y; i++) {
    itemNodes.push(fieldNode.appendChild(getFieldElementNode(i)));
}
const field = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
];
const wonField = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
];
setFieldItemsPosition();
document.getElementById("shuffle").addEventListener("click", shuffle);
fieldNode.addEventListener("click", (e) => {
    const buttonNode = e.target.closest("button");
    if (!buttonNode) {
        return;
    }
    const number = Number(buttonNode.getAttribute("item-id"));
    swapFieldItem(number);
});
addEventListener("keydown", keydown);
function keydown(event) {
    switch (event.keyCode) {
        case 37:
            swapFieldItem(getNumberRight(findCoords(0)));
            break;
        case 38:
            swapFieldItem(getNumberDown(findCoords(0)));
            break;
        case 39:
            swapFieldItem(getNumberLeft(findCoords(0)));
            break;
        case 40:
            swapFieldItem(getNumberUp(findCoords(0)));
            break;
    }
}

function getFieldElementNode(i) {
    let button = document.createElement("button");
    let span = document.createElement("span");
    span.textContent = i;
    span.classList.add("item-val");
    button.appendChild(span);
    button.setAttribute("item-id", i);
    button.classList.add("item");
    return button;
}

function setFieldItemsPosition() {
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            let value = field[y][x];
            if (value) {
                setFieldItemPosition(itemNodes[value - 1], x, y);
            }
        }
    }
}

function setFieldItemPosition(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`;
}

function swapFieldItem(number) {
    if (moveFieldItem(number)) {
        setFieldItemsPosition();
        if (isWon(wonField)) {
            showWon();
        }
    }
}

function moveFieldItem(number) {
    if (!number || number >= fieldSize.x * fieldSize.y || number < 1) {
        return;
    }
    const buttonCoords = findCoords(number);
    const blankCoords = findCoords(0);
    const diff_x = Math.abs(blankCoords.x - buttonCoords.x);
    const diff_y = Math.abs(blankCoords.y - buttonCoords.y);
    if (diff_x + diff_y != 1) {
        return false;
    }
    field[buttonCoords.y][buttonCoords.x] = 0;
    field[blankCoords.y][blankCoords.x] = number;
    return true;
}

function findCoords(number) {
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] === number) {
                return { x, y };
            }
        }
    }
    return null;
}

function isWon(wonField) {
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] !== wonField[y][x]) {
                return false;
            }
        }
    }
    return true;
}

const wonClass = "game-field-won";
function showWon() {
    fieldNode.classList.add(wonClass);
    setTimeout(() => {
        fieldNode.classList.remove(wonClass);
    }, 1000);
}

function shuffle() {
    let lastNumber = 0;
    for (let i = 0; i < 1000; i++) {
        let Numbers = getNearby(lastNumber);
        let num = Numbers[Math.floor(Math.random() * Numbers.length)];
        moveFieldItem(num);
        lastNumber = num;
    }
    setFieldItemsPosition();
}

function getNumberLeft(coords) {
    if (coords.x < 1) {
        return null;
    }
    return field[coords.y][coords.x - 1];
}

function getNumberRight(coords) {
    if (coords.x >= fieldSize.x - 1) {
        return null;
    }
    return field[coords.y][coords.x + 1];
}

function getNumberUp(coords) {
    if (coords.y < 1) {
        return null;
    }
    return field[coords.y - 1][coords.x];
}

function getNumberDown(coords) {
    if (coords.y >= fieldSize.y - 1) {
        return null;
    }
    return field[coords.y + 1][coords.x];
}

function getNearby(black = 0) {
    const nearby = [];
    const coords = findCoords(0);
    const left = getNumberLeft(coords);
    const right = getNumberRight(coords);
    const uo = getNumberUp(coords);
    const down = getNumberDown(coords);
    if (left && left !== black) {
        nearby.push(left);
    }
    if (right && right !== black) {
        nearby.push(right);
    }
    if (uo && uo !== black) {
        nearby.push(uo);
    }
    if (down && down !== black) {
        nearby.push(down);
    }
    return nearby;
}
