//project essential:
//    - grid that changes cell size but not grid size, should go from 14-64
//      - grid should be replaced time
//    - once mouse hover over grid, color should change
//    - extra: color changes random while hovering

//pseudo code 1.0

//prompt/slider:
// instead of prompt, will use slider
// need to get slider value
// slider value will be the new grid size
// grid should update every time the slider is changed (event)
let slider = document.getElementById(`slider`);
const sliderLbl = document.getElementById(`sliderLabel`)

//at page load
sliderLbl.textContent = `${slider.value} X ${slider.value}`;

slider.addEventListener(`input`, () => {
    removeRows();
    sliderLbl.textContent = `${slider.value} X ${slider.value}`;
    createGrid();
});

//grid creation:
// create amount of divs according to slider-value^2
// make the div widths the container of grid/slider-value
// use wrap fo make divs create new rows automatically <-- does not work
//      wrap alone does not work, will have to artificially create rows and cells
//      rows should only have height as width will be dealt with cells
// make the remove grid once slider-value changes

let grid = document.getElementById(`grid`);
let gridHeight = grid.clientHeight / slider.value;
let gridWidth = grid.clientWidth / slider.value;

//creates grid at page load
createGrid();

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

//hover:
// create event to check if mouse is over grid
// change background-colour of grid cells once over
// Hover only works when holding clicking down

grid.addEventListener("mousedown", (e) => {
    colourCell(e);
    grid.addEventListener("mouseover", colourCell);
});

grid.addEventListener(`mouseup`, () => {
    grid.removeEventListener("mouseover", colourCell, { once: true });
});

//on start up
let chosenColour = `#000000`;
let chosenBgColour = `#FFFFFF`;
let eraserColour = () => {
    return document.getElementById(`bgPkr`).value;
};

function colourCell(e) {
    e.target.style.backgroundColor = chosenColour;
}


//buttons:
// erase all: change all cell divs to white
// erase brush: while hover, change background to white
// colour brush: while hover, change background to chosen colour
// random brush: same as other brushes, but add 3 random variable to rgb

// const btnGroup = document.getElementsByClassName(`btn`);

// btnGroup[4].onclick = () => {eraser()}; //maybe its toggle
let eraserToggle = document.getElementById(`eraserTgl`);
console.log(eraserToggle.checked);
let temp = chosenColour;
eraserToggle.addEventListener(`change`, () => {

    if (eraserToggle.checked == true) {
        console.log(eraserToggle.checked);
        chosenColour = eraserColour();
    }
    if (eraserToggle.checked == false) {
        console.log(eraserToggle.checked);
        chosenColour =  document.getElementById(`brushPkr`).value;
    }

    //do something about the color picker still being activeafter grid reshaping and color changing


});
// x.checked;
function eraser() {
    chosenColour = chosenBgColour;
}

//erase toggle brush



// btnGroup[5].onclick = () => {eraseAll()};
//erase button
function eraseAll() {
    const cells = document.getElementsByClassName(`cell`);
    let arr = [...cells];
    arr.forEach((x) => {
        x.style.backgroundColor = `white`;
    });
}


let brushPicker = document.getElementById(`brushPkr`);
let bgPicker = document.getElementById(`bgPkr`);

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

//in case cancel is hit on the picker
// brushPicker.addEventListener("input", updateFirstPicker, false);
// bgPicker.addEventListener("input", updateFirstPicker, false);
// function updateFirstPicker(event) {
//     console.log(event.target.value);
// }