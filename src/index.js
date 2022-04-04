import "./styles.scss";

const fieldSize = 4;
const fieldNode = document.getElementById("game-field");
const itemNodes=[];
for(let i=1;i<fieldSize*fieldSize;i++) {
    itemNodes.push(fieldNode.appendChild(getFieldElementNode(i)));
}
const field=[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
setFieldItemsPosition(itemNodes, field);
document.getElementById("shuffle").addEventListener('click', (e)=>{
    console.log('Перемешать');
});
fieldNode.addEventListener('click', (e)=>{
    const buttonNode = e.target.closest('button');
    if (!buttonNode) {
        return;
    }
    const button=Number(buttonNode.getAttribute('item-id'));
    console.log(button);
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

function setFieldItemsPosition(nodes, field) {
    for(let y=0; y<field.length; y++) {
        for(let x=0; x<field[y].length; x++) {
            let value = field[y][x];
            if(value) {
                setFieldItemPosition(nodes[value-1], x, y);
            }
        }
    }
}

function setFieldItemPosition(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x*shiftPs}%, ${y*shiftPs}%, 0)`;
}