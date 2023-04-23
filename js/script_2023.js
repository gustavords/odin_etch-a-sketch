//grab grid location
const grid = document.getElementById(`grid`);
//create boxes

//append boxes



//create multiple boxes at once
let gridSize = 16 * 16;
//width/ gridSize
let boxWidth = (700 / 16);
let boxHeight = 700 / 16;
for (let i = 0; i < gridSize; i++) {
    const gridCell = document.createElement(`div`);
    gridCell.style.cssText = `box-sizing: border-box; border: 1px solid black; flex:auto;`;
    // gridCell.style.cssText = ``;
    gridCell.style.height = `auto`;
    gridCell.style.width = `${boxWidth}px`;
    gridCell.style.padding = 0;
    gridCell.style.margin = 0;


    gridCell.style[`background-color`] = `red`;
    grid.appendChild(gridCell);
}