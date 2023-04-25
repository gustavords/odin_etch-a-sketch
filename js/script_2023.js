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
let eraserColour = () => {return bgPicker.value};
sliderLbl.textContent = `${slider.value} X ${slider.value}`;
createGrid();


//resize grid event
slider.addEventListener(`input`, () => {
    removeRows();
    sliderLbl.textContent = `${slider.value} X ${slider.value}`;
    createGrid();
});

/**TODO:
 * - keep same color during grid resize? or ask.warn before resizing
 */
function createGrid() {
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
            gridCell.style.backgroundColor = `white`;
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
});

grid.addEventListener(`mouseup`, () => {
    grid.removeEventListener("mouseover", colourCell, { once: true });
});

function colourCell(e) {
    e.target.style.backgroundColor = chosenColour;
}

//eraser toggle button event
/**TODO:
 * - fix reset for color or bg picker is changed
 * - fix reset fro when grid is resized
 */
eraserToggle.addEventListener(`change`, () => {
    if (eraserToggle.checked == true) {
        console.log(eraserToggle.checked);
        chosenColour = eraserColour();
    }
    if (eraserToggle.checked == false) {
        console.log(eraserToggle.checked);
        chosenColour = document.getElementById(`brushPkr`).value;
    }
});

//erase background button event
btnGroup[5].onclick = () => { eraseAll() };

function eraseAll() {
    const cells = document.getElementsByClassName(`cell`);
    let arr = [...cells];
    arr.forEach((x) => {
        x.style.backgroundColor = `white`;
    });
}

//brush colour change button
brushPicker.addEventListener("change", changeColorPicker, false);

//background colour change button
bgPicker.addEventListener("change", (e) => {
    const cells = document.getElementsByClassName(`cell`);
    changeBgColorPicker(e);
    for (let colours of cells) {
        colours.style.backgroundColor = chosenBgColour;
    }
}, false);

function changeColorPicker(event) {
    chosenColour = event.target.value;
}
function changeBgColorPicker(event) {
    chosenBgColour = event.target.value;
}