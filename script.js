//16x16 grid of square divs
const gridLocation = document.querySelector(`.grid_container`);
const gridSizeDisplayLocation =
  document.getElementsByClassName(`gridSizeDisplay`);
const gridSizeSliderLocation = document.getElementById(`gridSize`);

let cellLocation;
let gridHeight = 500;

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
  //add css class that cointains same number of autos as getGridSIze
  let text = ``;
  for (let i = 0; i < gridSize; i++) {
    // text += `auto `;
    // text += `minmax(auto, 1fr) `;
    text += `1fr `;
    // text += `minmax(1fr, 1fr) `;
  }
  gridLocation.style.cssText = `grid-template-columns: ` + text;

  // gridHeight = gridLocation.clientHeight;// does not work
  // console.log(gridHeight);
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

    // cell.addEventListener("mouseup", () => {
    //   cell.style.cssText = `background-color: red;`;
    // });

    //if button toggled, rainbow
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
  )},${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )})`;
  otherToken = 1;
  console.log("this is otherTojen: " + otherToken);
  if (rainbowToken > 0) {
    rainbowButton.style.backgroundColor = `rgb(${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )})`;

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

createGrid(16);
cellLocation = document.querySelectorAll(`.cell`);
cellLocation.forEach((cell) => {
  cell.addEventListener("mouseover", () => {
    cell.style.cssText += `background-color: blue;`;
  });
});

// //kinda works
// cellLocation.forEach((cell) => {
//   cell.addEventListener("mousedown", () => {
//     paintCells(cellLocation);
//   });
//   cell.addEventListener("mousedup", () => {
//       console.log("yo you up");
//   });
// });

const parent_element = document.querySelector(`.parent`);
const child_element = document.querySelector(`.child`);

parent_element.addEventListener(`mousedown`, () => {
  parent_element.style.backgroundColor = `green`;
});
parent_element.addEventListener(`mouseup`, () => {
  parent_element.style.backgroundColor = `red`;
});
