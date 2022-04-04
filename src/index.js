import "./styles.scss";

const fieldSize = 4;
const fieldNode = document.getElementById("game-field");
const itemNodes = [];
for (let i = 1; i < fieldSize * fieldSize; i++) {
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
document.getElementById("shuffle").addEventListener("click", (e) => {
    console.log("Перемешать");
});
fieldNode.addEventListener("click", (e) => {
    const buttonNode = e.target.closest("button");
    if (!buttonNode) {
        return;
    }
    const number = Number(buttonNode.getAttribute("item-id"));
    if (swapFieldItem(number)) {
        setFieldItemsPosition(itemNodes, field);
        if (isWon(wonField)) {
            showWon();
        }
    }
});

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
