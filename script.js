//16x16 grid of square divs
const gridLocation = document.querySelector(`.grid_container`);
const gridSizeDisplayLocation =
  document.getElementsByClassName(`gridSizeDisplay`);
const gridSizeSliderLocation = document.getElementById(`gridSize`);

let cellLocation;
let gridHeight = 600;

// console.log("grid height: " + gridLocation.clientHeight);

function getGridSize() {
  gridSize = gridSizeSliderLocation.value;
  return gridSize;
}

function displayGridSize() {
  gridSizeDisplayLocation[0].innerText = `${getGridSize()}`;
  gridSizeDisplayLocation[1].innerText = `${getGridSize()}`;
}

function createGrid(gridSize) {
  //add css class that cointains same number of autos as getGridSIze
  let text = ``;
  for (let i = 0; i < gridSize; i++) {
    // text += `auto `;
    // text += `minmax(auto, 1fr) `;
    text += `1fr `;
    // text += `minmax(1fr, 1fr) `;
  }
  gridLocation.style.cssText = `grid-template-columns: ` + text;

  // console.log("grid height: " + gridLocation.clientHeight);// does not work

  gridHeightAdjusted = gridHeight / gridSize;
  console.log(gridHeightAdjusted);

  //actually create grid
  gridSize = Math.pow(gridSize, 2);
  for (let i = 0; i < gridSize; i++) {
    let cell = document.createElement(`div`);
    cell.setAttribute(`class`, `cell`);

    //add height of cell
    cell.style.height = `${gridHeightAdjusted}px`;
    cell.style.width = `${gridHeightAdjusted}px`;
    gridLocation.appendChild(cell);
  }

  // console.log(gridHeight + " after");

  cellLocation = document.querySelectorAll(`.cell`);
}

function removeGrid() {
  cellLocation.forEach((cell) => {
    gridLocation.removeChild(cell);
  });
}

////////
function paintCells(cells) {
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
        cell.style.cssText += `background-color: blue;`;
        otherToken = 0;
      });
    }
  });
}

function paint(cell) {
  cell.style.cssText = `background-color: red;`;
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

gridSizeSliderLocation.addEventListener(`input`, () => {
  removeGrid();
  displayGridSize();
  createGrid(getGridSize());
  paintCells(cellLocation);
});

//where the stuff actually runs
createGrid(16);
cellLocation = document.querySelectorAll(`.cell`);
// cellLocation.forEach((cell) => {
//   cell.addEventListener("mouseover", () => {
//     cell.style.cssText += `background-color: blue;`;
//   });
// });

// //kinda works
let tokenTest = 0;
// cellLocation.forEach((cell) => {
//   cell.addEventListener("mousedown", () => {
//     tokenTest = 1;
//     console.log(`tokenTest:  ${tokenTest} on`);

//     paintCells(cellLocation);
//   });
//   cell.addEventListener("mouseup", () => {
//     tokenTest = 0;
//     console.log(`tokenTest: ${tokenTest} off`);
//     return false;
//   });
// });


/////holy shit this works

let isMouseDown = false;

gridLocation.addEventListener(`mousedown`, () => {
  isMouseDown = true;
  console.log(`isMouseDown: ${isMouseDown}`);

  cellLocation = document.querySelectorAll(`.cell`);
  return isMouseDown;
});

gridLocation.addEventListener(`mouseup`, () => {
  isMouseDown = false;
  console.log(`isMouseDown: ${isMouseDown}`);
  return isMouseDown;
});

cellLocation.forEach((cell) => {
  cell.addEventListener(`mouseover`, () => {
    if (isMouseDown) {
      cell.style.backgroundColor = `green`;
      console.log(`we did get here`);
    }
  });
});




const parent_element = document.querySelector(`.parent`);
const child_element = document.querySelector(`.child`);

parent_element.addEventListener(`mousedown`, () => {
  parent_element.style.backgroundColor = `green`;
});
parent_element.addEventListener(`mouseup`, () => {
  parent_element.style.backgroundColor = `red`;
});

child_element.addEventListener(`mousedown`, (e) => {
  e.stopPropagation();
  child_element.style.backgroundColor = `purple`;
});
child_element.addEventListener(`mouseup`, (e) => {
  e.stopPropagation();
  child_element.style.backgroundColor = `yellow`;
});
