class Board4x4 {
    constructor() {
        this.numRows = 4;
        this.numCols = 4;
        this.board = this.populateBoard();
    };

    randomTotalGenerator() {
        let randomTotal = [4, 5];
        let randomIndex = Math.floor(Math.random() * randomTotal.length);

        return randomTotal[randomIndex];
    };

    randomColorGenerator() {
        let randomColor = ["blue", "red"];

        let randomIndex = Math.floor(Math.random() * randomColor.length);
        return randomColor[randomIndex];
    };

    randomTileGenerator() {
        const rows = [1, 2, 3, 4];
        const cols = [1, 2, 3, 4];

        const randRow = rows[Math.floor(Math.random() * rows.length)];
        const randCol = cols[Math.floor(Math.random() * cols.length)];

        const tile = [`r${randRow}`, `c${randCol}`];

        return tile;
    };

    checkTile(obj, visited = new Set()) {
        let tile = this.randomTileGenerator();
    
        if (obj[tile[0]] < 2 && obj[tile[1]] < 2 && !visited.has(obj[tile])) return tile;
    
        visited.add(tile);
    
        return this.checkTile(obj, visited);
    };

    generateTiles() {
        const randomTotal = this.randomTotalGenerator();
    
        const myTiles = {
            r1: 0,
            r2: 0,
            r3: 0,
            r4: 0,
            c1: 0,
            c2: 0,
            c3: 0,
            c4: 0,
            total: randomTotal
        };
    
        while (myTiles.total > 0) {
            const tile = this.checkTile(myTiles);
    
            myTiles[tile[0]]++;
            myTiles[tile[1]]++;
    
            myTiles.total--;
        };
    
        return myTiles;
    };

    populateBoard() {
        const grid = [];
        const tiles = this.generateTiles();
        const rows = Object.values(tiles).splice(0, 4);
        const cols = Object.values(tiles).splice(4, 4);

        for (let i = 0; i < this.numRows; i++) {
            grid.push([]);
            for (let j = 0; j < this.numCols; j++) {
                let currTile = [rows[i], cols[i]];

                if (currTile[i] > 0 )
                grid[i].push(currTile);
            };
        };

        return grid;
    };

    returnTile() {
        return this.board[row][col];
    };
};

const newBoard = new Board4x4;
console.log(newBoard.generateTiles());

try {
    module.exports = Board4x4;
} catch {
    module.exports = null;
};