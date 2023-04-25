const slider = document.getElementById(`slider`);
const sliderLbl = document.getElementById(`sliderLabel`)
const grid = document.getElementById(`grid`);
const gridHeight = grid.clientHeight / slider.value;
const gridWidth = grid.clientWidth / slider.value;
const btnGroup = document.getElementsByClassName(`btn`);
const brushPicker = document.getElementById(`brushPkr`);
const bgPicker = document.getElementById(`bgPkr`);
const eraserToggle = document.getElementById(`eraserTgl`);

//on start up
let chosenColour = brushPicker.value;
let chosenBgColour = bgPicker.value;
const eraserColour = () => { return bgPicker.value };
const eraserToggleChecked = () => { return eraserToggle.checked };
sliderLbl.textContent = `${slider.value} X ${slider.value}`;
createGrid();


//resize grid event
slider.addEventListener(`input`, () => {
    removeRows();
    sliderLbl.textContent = `${slider.value} X ${slider.value}`;
    createGrid();
});

/**TODO:
 * waring before resizing
 *    -- maybe do a hover thing where it warns you
 */
function createGrid() {
    //resets eraser toggle
    if (eraserToggleChecked() == true) eraserToggle.click();
    //creates row
    for (let i = 0; i < slider.value; i++) {
        let row = document.createElement(`div`);
        row.setAttribute(`class`, `row`);
        // row.style.border = `.5px solid black`
        row.style.boxSizing = `border-box`;
        // row.style.backgroundColor = `white`;
        row.style.height = `${gridHeight}px`; //this will determine the division of the grids
        row.style.width = `100%`;
        row.style.display = `flex`;
        grid.appendChild(row);

        //creates cell in each row
        for (let i = 0; i < slider.value; i++) {
            let gridCell = document.createElement(`div`);
            gridCell.setAttribute(`class`, `cell`);
            gridCell.style.border = `.5px solid black`
            gridCell.style.boxSizing = `border-box`;
            gridCell.style.backgroundColor = `${chosenBgColour}`; //colour of background
            gridCell.style.height = `auto`;
            gridCell.style.width = `${gridWidth}px`;//this will determine the division of the grids
            row.appendChild(gridCell);
        }
    }
}

function removeRows() {
    let row = document.getElementsByClassName(`row`);
    let arr = [...row];
    arr.forEach(x => {
        x.remove();
    });
}


//paint cell events
grid.addEventListener("mousedown", (e) => {
    colourCell(e);
    grid.addEventListener("mouseover", colourCell);
    pauseEvent(e);
});

grid.addEventListener(`mouseup`, (e) => {
    grid.removeEventListener("mouseover", colourCell, { once: true });
    pauseEvent(e);
});

//stops propagations, ∴ stopping mouse drag event
function pauseEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}
function colourCell(e) {
    e.target.style.backgroundColor = chosenColour;
}

//eraser toggle button event
eraserToggle.addEventListener(`change`, () => {
    if (eraserToggle.checked == true) {
        chosenColour = eraserColour();
    }
    if (eraserToggle.checked == false) {
        chosenColour = brushPicker.value;
    }
});

//erase background button event
btnGroup[5].onclick = () => {
    if (eraserToggleChecked() == true) eraserToggle.click();
    eraseAll();
};

//erases to current background color
function eraseAll() {
    const cells = document.getElementsByClassName(`cell`);
    let arr = [...cells];
    arr.forEach((x) => {
        x.style.backgroundColor = bgPicker.value;
    });
}

//brush colour change button
brushPicker.addEventListener("change", changeColorPicker, false);

// let previousBrushColour = [];
// previousBrushColour.push(chosenColour);
// console.log(previousBrushColour);

// previousBrushColour.push(chosenColour);
// console.log(previousBrushColour);

// if(previousBrushColour.includes(chosenBgColour)){
//     console.log(`here`)
// }

/**
 * TODO: figure out a way to keep the colors of brush in history to not be changed with background
 */
//background colour change button
bgPicker.addEventListener("change", (e) => {

    if (eraserToggleChecked() == true) eraserToggle.click();

    const cells = document.getElementsByClassName(`cell`);
    changeBgColorPicker(e);


    for (let cell of cells) {

        let cellColor = cell.style.backgroundColor;
        const rgbArr = toRGBArray(cellColor)
        let hexValOfCellBkgCol = rgbToHex(rgbArr[0], rgbArr[1], rgbArr[2]);


        if (hexValOfCellBkgCol == chosenColour) {
            cell.style.backgroundColor = chosenColour;
        }
        else {
            cell.style.backgroundColor = chosenBgColour;

        }
    }
}, false);


/**
 * all of this is because theres no rgb to hex conversion in js
 * and html outputs different color values from style.background and input buttons 
 */
const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function changeColorPicker(event) {
    chosenColour = event.target.value;
}

function changeBgColorPicker(event) {
    chosenBgColour = event.target.value;
}

function updateFirst(event) {
    return event.target.value;
}
