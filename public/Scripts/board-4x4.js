export default class Board4x4 {
    constructor() {
        this.numRows = 4;
        this.numCols = 4;
        this.board = this.populateBoard();
    };

    randomTotalGenerator = () => {
        let randomTotal = [4, 5];
        let randomIndex = Math.floor(Math.random() * randomTotal.length);

        return randomTotal[randomIndex];
    };

    randomNodeGenerator = (obj) => {
        let row = Math.floor(Math.random() * 4);
        let col = Math.floor(Math.random() * 4);
    
        let node = [row, col];
    
        return node;
    };

    generateTiles() {
        const randomTotal = this.randomTotalGenerator();
        const myTiles = {
            row1: 0,
            row2: 0,
            row3: 0,
            row4: 0,
            col1: 0,
            col2: 0,
            col3: 0,
            col4: 0,
            total: randomTotal
        };

        const randomNode = this.randomNodeGenerator();

        while (myTiles.total > 0) {
            if (myTiles)

            myTiles.total--;
        };

        return myTiles;
    };

    populateBoard() {
        const grid = [];
        const tiles = this.generateTiles();

        return grid;
    };

    checkTile() {
        return this.board[row][col];
    };
};