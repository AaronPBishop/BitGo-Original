export default class Board4x4 {
    constructor() {
        this.numRows = 4;
        this.numCols = 4;
        this.fillBoard = this.generateBoard();
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
        const randRow = Math.floor(Math.random() * 3);
        const randCol = Math.floor(Math.random() * 3);

        const tile = [`r${randRow}`, `c${randCol}`];

        return tile;
    };

    checkTile(obj, visited = new Set()) {
        const tile = this.randomTileGenerator();
        const row = tile[0];
        const col = tile[1];
    
        if (obj[row] < 2 && obj[col] < 2 && !visited.has(obj[tile])) return tile;
    
        visited.add(tile);
    
        return this.checkTile(obj, visited);
    };

    generateValidTiles() {
        const randomTotal = this.randomTotalGenerator();
        const finalTiles = [];
    
        const tileTracker = {
            r0: 0,
            r1: 0,
            r2: 0,
            r3: 0,
            c0: 0,
            c1: 0,
            c2: 0,
            c3: 0,
            total: randomTotal
        };
    
        while (tileTracker.total > 0) {
            const currTile = this.checkTile(tileTracker);
            const row = currTile[0];
            const col = currTile[1];

            finalTiles.push(currTile);
    
            tileTracker[row]++;
            tileTracker[col]++;
    
            tileTracker.total--;
        };
    
        return finalTiles;
    };

    generateGrid() {
        const grid = [];

        for (let i = 0; i < this.numRows; i++) {
            grid.push([]);

            for (let j = 0; j < this.numCols; j++) {
                grid[i].push(null);
            };
        };

        return grid;
    };

    getCoordinates() {
        const tiles = this.generateValidTiles();

        const coordinates = [];
        while (tiles.length > 0) {
            let currTile = tiles.shift();
            let [currRow, currCol] = currTile;

            let rowNum = currRow.split('').splice(1, 1).join('');
            let colNum = currCol.split('').splice(1, 1).join('');
            
            coordinates.push([Number(rowNum), Number(colNum)]);
        };
        
        return coordinates;
    };

    generateBoard() {
        const board = this.generateGrid();
        const coordinates = this.getCoordinates();

        coordinates.forEach(coordinate => {
            let [currRow, currCol] = coordinate;

            board[currRow][currCol] = this.randomColorGenerator();
        });

        return board;
    };

    tileValue(row, col) {
        return this.fillBoard[row][col];
    };
};

// const newBoard = new Board4x4;
// console.log(newBoard.generateBoard());