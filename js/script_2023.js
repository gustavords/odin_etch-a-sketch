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
let sliderLbl = document.getElementById(`sliderLabel`)

//at page load
sliderLbl.textContent = `${slider.value} X ${slider.value}`;

slider.addEventListener(`input`, () => {
    removeRows();
    sliderLbl.textContent = `${slider.value} X ${slider.value}`;
    createGrid();
});


//grid creation:
// create amount of divs according to slider-value^2
// make the div widths the container of grid/slider-value <-- does not work
//      wrap alone does not work, will have to artificially create rows and cells
//      rows should only have height as width will be dealt with cells
// use wrap fo make divs create new rows automatically 
// make the remove grid once slider-value changes

let grid = document.getElementById(`grid`);
let numOfCells = (slider.value) ** 2;
let gridHeight = grid.clientHeight / slider.value;
let gridWidth = grid.clientWidth / slider.value;

//creates grid at page load
createGrid();

function createGrid() {
    for (let i = 0; i < slider.value; i++) {
        let row = document.createElement(`div`);
        row.setAttribute(`class`, `row`);
        // row.style.border = `.5px solid black`
        row.style.boxSizing = `border-box`;
        row.style.backgroundColor = `green`;
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
            gridCell.style.backgroundColor = `green`;
            gridCell.style.height = `auto`;
            gridCell.style.width = `${gridWidth}px`;//this will determine the division of the grids
            row.appendChild(gridCell);
        }
    }
}

function removeRows() {
    let row = document.getElementsByClassName(`row`);
    console.log(...row);
    let arr = [...row];
    arr.forEach(x => {
        x.remove();
    });
}


//hover:
// create event to check if mouse is over grid
// change background-colour of grid cells once over
// Hover only works when holding click down

grid.addEventListener("mousedown", (e) => {
    colorMe(e);
    grid.addEventListener("mouseover",colorMe);
});

grid.addEventListener(`mouseup`, () => {
    grid.removeEventListener("mouseover", colorMe, {once:true});
});

function colorMe (e) {
    e.target.style.backgroundColor = `blue`;
}
// grid.onmousedown = 
// grid.onmouseup = remove();
// grid.onmousemove = handler;



// function handler(event) {
//   let type = event.type;
//   console.log(type);
// }


// grid.addEventListener("mouseup", (e) => {
//     grid.removeEventListener(`mouseover`, (e) => {
//         console.log(e.target.style.backgroundColor = `red`) ;
//     })
// });

// grid.addEventListener("click", (e) => {
//     console.log(e.target.style.backgroundColor = `blue`) ;
    
// });

//buttons:
// erase all: change all cell divs to white
// erase brush: while hover, change background to white
// colour brush: while hover, change background to chosen colour
// random brush: same as other brushes, but add 3 random variable to rgb
