import Board4x4 from "./board-4x4.js";
const randomBoard = new Board4x4();
const presetTiles = randomBoard.fillBoard;
const currentGrid = randomBoard.grid;
const gameBox = document.getElementById('game-box');

const currentMinute = document.getElementById("current-minute");
const currentSecond = document.getElementById("current-second");
let seconds = 0;

const timer = val => val > 9 ? val : "0" + val;

setInterval(() => {
    currentMinute.innerHTML = timer(parseInt(seconds / 60, 10));
    currentSecond.innerHTML = timer(++seconds % 60);
}, 1000);

const alterTile = e => {
    if (e.target.style.backgroundColor === "rgb(41, 38, 38)" || e.target.style.backgroundColor === "") {
      e.target.style.backgroundColor = "red";
      currentGrid[e.target.dataset.row][e.target.dataset.col] = 0;
    } else if (e.target.style.backgroundColor === "red") {
      e.target.style.backgroundColor = "blue";
      currentGrid[e.target.dataset.row][e.target.dataset.col] = 1;
    } else {
      e.target.style.backgroundColor = "rgb(41, 38, 38)";
      currentGrid[e.target.dataset.row][e.target.dataset.col] = null;
    };
};

const populateBoard = (grid) => {
  if (grid && grid.length > 0) {
    for (let row = 0; row < grid.length; row++) {
        const currDiv = document.createElement('div');
        gameBox.appendChild(currDiv);

        for (let col = 0; col < grid.length; col++) {
            const currTile = document.createElement('button');
            currTile.setAttribute('class', 'buttons');
            currTile.setAttribute('data-row', row);
            currTile.setAttribute('data-col', col);

            const currTileVal = randomBoard.tileValue(currTile.dataset.row, currTile.dataset.col);

            if (currTileVal === 0) currTile.style.backgroundColor = 'red';
            if (currTileVal === 1) currTile.style.backgroundColor = 'blue';
            if (currTileVal === null) currTile.addEventListener('click', e => {
              alterTile(e);
              randomBoard.checkWin(currentGrid);
            });
            
            gameBox.appendChild(currTile);
        };
    };
  };
};

window.addEventListener('DOMContentLoaded', () => {
    populateBoard(presetTiles);
    timer();
});