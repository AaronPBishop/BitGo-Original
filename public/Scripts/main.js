import Board4x4 from "./board-4x4.js";
const board = new Board4x4();
const tiles = board.fillBoard;
const gameBox = document.getElementById('game-box');

const alterTile = e => {
    let tile = e.target;
    if (tile.style.backgroundColor === "rgb(41, 38, 38)" || tile.style.backgroundColor === "") {
      tile.style.backgroundColor = "red";
    } else if (tile.style.backgroundColor === "red") {
      tile.style.backgroundColor = "blue";
    } else {
      tile.style.backgroundColor = "rgb(41, 38, 38)";
    };
};

const populateBoard = (grid) => {
    for (let row = 0; row < grid.length; row++) {
        const currDiv = document.createElement('div');
        gameBox.appendChild(currDiv);

        for (let col = 0; col < grid.length; col++) {
            const currTile = document.createElement('button');
            currTile.setAttribute('class', 'buttons');
            currTile.setAttribute('data-row', row);
            currTile.setAttribute('data-col', col);

            const currTileVal = board.tileValue(currTile.dataset.row, currTile.dataset.col);

            if (currTileVal === 'blue') currTile.style.backgroundColor = 'blue';
            if (currTileVal === 'red') currTile.style.backgroundColor = 'red';
            if (currTileVal === null) currTile.addEventListener('click', alterTile);

            gameBox.appendChild(currTile);
        };
    };
};

window.addEventListener('DOMContentLoaded', () => {
    populateBoard(tiles);
});