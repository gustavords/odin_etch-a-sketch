//16x16 grid of square divs
const grid = document.querySelector(`.grid_container`);
const gridSizeDisplayLocation =
  document.getElementsByClassName(`gridSizeDisplay`);
const gridSizeSliderLocation = document.getElementById(`gridSize`);

let cellLocation;
let gridHeight = 600;

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

////////
function paintCells(cells, paintColour) {
  cells.forEach((cell) => {
    if (rainbowToken > 0) {
      cell.addEventListener("mouseover", () => {
        cell.style.cssText += `background-color: rgb(${Math.floor(
          Math.random() * 255
        )},${Math.floor(Math.random() * 255)},${Math.floor(
          Math.random() * 255
        )});`;
      });
    } else {
      cell.addEventListener("mouseover", () => {
        cell.style.cssText += `background-color: ${paintColour} ;`;
        otherToken = 0;
      });
    }
  });
}

const rainbowButton = document.getElementById(`rainbow`);
let rainbowToken = 0;
let otherToken = 0;

rainbowButton.addEventListener(`click`, () => {
  console.log("toggle");
  rainbowButton.style.backgroundColor = `rgb(${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
  otherToken = 1;
  console.log("this is otherTojen: " + otherToken);
  if (rainbowToken > 0) {
    rainbowButton.style.backgroundColor = `rgb(${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;

    --rainbowToken;
  } else {
    ++rainbowToken;
  }
  console.log(rainbowToken);
  removeGrid();
  createGrid(getGridSize());
  paintCells(cellLocation);
});

//slider event for resizing grid
gridSizeSliderLocation.addEventListener(`input`, () => {
  removeGrid();
  displayGridSize();
  createGrid(getGridSize());
  paintCells(cellLocation);
});

//where the stuff actually runs
//--------------------------////-------------------------///

createGrid();
cellLocation = document.querySelectorAll(`.cell`);
// cellLocation.forEach((cell) => {
//   cell.addEventListener("mouseover", () => {
//     cell.style.cssText += `background-color: blue;`;
//   });
// });

//--------------------------////-------------------------///

/////holy shit this works
//--------------------------////-------------------------///
//--------------------------////-------------------------///
//--------------------------////-------------------------///

let isMouseDown = false;

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

cellLocation.forEach((cell) => {
  //Issue:mouse doesnt actually "paint" the cell clicked on
  //TODO:figure out how to add an event for the initial click
  cell.addEventListener(`mouseover`, () => {
    if (isMouseDown) {
      cell.style.backgroundColor = `${paintColour}`;
      console.log(`we did get here`);
    }
  });
});
//--------------------------////-------------------------///
//--------------------------////-------------------------///
//--------------------------////-------------------------///
let colourSlc = document.getElementById(`colour_selector`);

// colourSlc.addEventListener(`click`, () => {
//   console.log("colour clicked");
// });

//TODO: load function so we know what paint color is what
let paintColour = ``;
colourSlc.addEventListener(
  "change",
  () => {
    colourSlc.select();
    paintColour = colourSlc.value;
    console.log(`colour value:${paintColour} typeof:${typeof paintColour} `);
  },
  false
);
