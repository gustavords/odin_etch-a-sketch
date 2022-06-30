//16x16 grid of square divs
const grid = document.querySelector(`.grid_container`);
const gridSizeDisplayLocation =
  document.getElementsByClassName(`gridSizeDisplay`);
const gridSizeSliderLocation = document.getElementById(`gridSize`);

let cellLocation = document.querySelectorAll(`.cell`);
let gridHeight = 600;
let colourSlc = document.getElementById(`colour_selector`);
let rainbowTgl = document.getElementById(`rainbow_switch`);
let eraseTgl = document.getElementById(`erase_switch`);
let isRainbowChecked = false;
let isEraseChecked = false;
let isMouseDown = false;
let paintColour = colourSlc.value;

function getGridSize() {
  gridSize = gridSizeSliderLocation.value;
  return gridSize;
}

function displayGridSize() {
  gridSizeDisplayLocation[0].innerText = `${getGridSize()}`;
  gridSizeDisplayLocation[1].innerText = `${getGridSize()}`;
}

function createGrid(gridSize = 16) {
  //adds css for grid
  let text = ``;
  for (let i = 0; i < gridSize; i++) {
    text += `1fr `;
  }
  grid.style.cssText = `grid-template-columns: ` + text;

  //TODO: Figure out why .clientHeight work in console but not from script( returns 0)
  // console.log("grid height: " + grid.clientHeight);// does not work
  gridHeightAdjusted = gridHeight / gridSize;

  //creates grid
  gridSize = Math.pow(gridSize, 2);
  for (let i = 0; i < gridSize; i++) {
    let cell = document.createElement(`div`);
    cell.setAttribute(`class`, `cell`);

    //adds height& width of cell
    cell.style.height = `${gridHeightAdjusted}px`;
    cell.style.width = `${gridHeightAdjusted}px`;
    grid.appendChild(cell);
  }
  //sets cellLocation
  cellLocation = document.querySelectorAll(`.cell`);
}

function removeGrid() {
  cellLocation.forEach((cell) => {
    grid.removeChild(cell);
  });
}

function paint() {
  cellLocation.forEach((cell) => {
    //Issue:mouse doesnt actually "paint" the cell clicked on
    //TODO:figure out how to add an event for the initial click
    cell.addEventListener(`mouseover`, () => {
      if (isMouseDown) {
        if (isRainbowChecked) {
          //255,255,255 is white, so dont go that far
          cell.style.cssText += `background-color: rgb(${Math.floor(
            Math.random() * 254
          )},${Math.floor(Math.random() * 254)},${Math.floor(
            Math.random() * 254
          )});`;
        } else if (isEraseChecked) {
          cell.style.backgroundColor = `white`;
        } else {
          cell.style.backgroundColor = `${paintColour}`;
        }
      }
    });
  });
}

function erase() {
  cellLocation.forEach((cell) => {
    cell.style.backgroundColor = `white`;
  });
}

//where the stuff actually runs
//--------------------------////-------------------------///

//slider event for resizing grid
gridSizeSliderLocation.addEventListener(`input`, () => {
  removeGrid();
  displayGridSize();
  createGrid(getGridSize());
  paint();
});

grid.addEventListener(`mousedown`, () => {
  isMouseDown = true;
  console.log(`isMouseDown: ${isMouseDown}`);
  //reset div grid position
  // cellLocation = document.querySelectorAll(`.cell`);
  return isMouseDown;
});

grid.addEventListener(`mouseup`, () => {
  isMouseDown = false;
  console.log(`isMouseDown: ${isMouseDown}`);
  return isMouseDown;
});

//gets paint value
colourSlc.addEventListener(
  `change`,
  () => {
    colourSlc.select();
    paintColour = colourSlc.value;
  },
  false
);

//rainbow toogle event
rainbowTgl.addEventListener(`change`, () => {
  //sets isRainbowChecked
  if (isEraseChecked) {
    //do not know why i need to set it to false twice, but i need it or it doesn't work
    eraseTgl.checked = false;
    isEraseChecked = false;
    isRainbowChecked = rainbowTgl.checked;
  } else {
    isRainbowChecked = rainbowTgl.checked;
  }
});

eraseTgl.addEventListener(`change`, () => {
  if (isRainbowChecked) {
    //do not know why i need to set it to false twice, but i need it or it doesn't work
    rainbowTgl.checked = false;
    isRainbowChecked = false;
    isEraseChecked = eraseTgl.checked;
  } else {
    isEraseChecked = eraseTgl.checked;
  }
});

document.getElementById("erase_btn").addEventListener(`click`, erase);

createGrid();
paint();
