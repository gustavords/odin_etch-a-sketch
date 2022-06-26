//16x16 grid of square divs
const gridLocation = document.querySelector(`.grid_container`);
const gridSizeDisplayLocation =
  document.getElementsByClassName(`gridSizeDisplay`);
const gridSizeSliderLocation = document.getElementById(`gridSize`);

let cellLocation;

function getGridSize() {
  gridSize = gridSizeSliderLocation.value;
  return gridSize;
}

function displayGridSize() {
  //i dont understand yet how this doesnt work
  // gridSizeDisplayLocation.forEach((item) =>{{
  //   item.innerText = `${getGridSize()}`;
  // }});

  ///this fucks with memory
  // for(let i = 0; 1 < gridSizeDisplayLocation.length; i++){
  //   gridSizeDisplayLocation[i].innerText = `${getGridSize()}`;
  // }
  // gridSizeDisplayLocation.innerText = `${getGridSize()}`;

  gridSizeDisplayLocation[0].innerText = `${getGridSize()}`;
  gridSizeDisplayLocation[1].innerText = `${getGridSize()}`;
}

function createGrid(gridSize) {
  let cell = document.createElement(`div`);
  cell.setAttribute(`class`, `cell`);
  gridLocation.appendChild(cell);

  //add css class that cointains same number of autos as getGridSIze
  let text = ``;
  for (let i = 0; i < gridSize; i++) {
    text += `auto `;
  }
  gridLocation.style.cssText = `grid-template-columns: ` + text;

  //actually create grid
  gridSize = Math.pow(gridSize, 2);
  for (let i = 1; i < gridSize; i++) {
    let cell = document.createElement(`div`);
    cell.setAttribute(`class`, `cell`);
    gridLocation.appendChild(cell);
  }

  cellLocation = document.querySelectorAll(`.cell`);
}

function removeGrid() {
  cellLocation.forEach((cell) => {
    gridLocation.removeChild(cell);
  });
}

function paintCells(cells) {
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.style.cssText = `background-color: blue;`;
    });
  });
}


function paint(cell) {
  cell.style.cssText = `background-color: red;`;
}

gridSizeSliderLocation.addEventListener(`input`, () => {
  removeGrid();
  displayGridSize();
  createGrid(getGridSize());
  paintCells(cellLocation);
});

createGrid(16);
// cellLocation = document.querySelectorAll(`.cell`);
cellLocation.forEach((cell) => {
  cell.addEventListener("mouseover", () => {
    cell.style.cssText = `background-color: red;`;
  });
});


