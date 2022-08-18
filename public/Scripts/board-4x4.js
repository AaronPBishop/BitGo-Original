export default class Board4x4 {
    constructor() {
        this.numRows = 4;
        this.numCols = 4;
        this.grid = [];
        this.fillBoard = this.generateBoard();
    };

    randomTotalGenerator() {
        let randomTotal = [4, 5];
        let randomIndex = Math.floor(Math.random() * randomTotal.length);

        return randomTotal[randomIndex];
    };

    randomColorGenerator() {
        return Math.floor(Math.random() * 2);
    };

    randomTileGenerator() {
        const randRow = Math.floor(Math.random() * 4);
        const randCol = Math.floor(Math.random() * 4);

        const tile = [`r${randRow}`, `c${randCol}`];

        return tile;
    };

    checkTile(obj, visited) {
        const tile = this.randomTileGenerator();
        const row = tile[0];
        const col = tile[1];

        if (obj[row] < 2 && obj[col] < 2 && !visited.has(`${tile}`)) {
            visited.add(`${tile}`);
            return tile;
        };

        visited.add(`${tile}`);

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

        const visited = new Set();
        while (tileTracker.total > 0) {
            const currTile = this.checkTile(tileTracker, visited);
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

     checkBoard(clrCrds) {
        const red = Object.values(clrCrds[0]);
        const blue = Object.values(clrCrds[1]);
        let check = 0;

        // Checking for duplicate red pairs in col/row
        for (let i = 0; i < red.length; i++) {
            const currCoord = red[i];
            const nextCoord = red[i + 1];
            if (nextCoord) {
                if (currCoord[1] === nextCoord[1]) check++;
                if (currCoord[0] === nextCoord[0]) check++;
            };
        };

        // Checking for duplicate blue pairs in col/row
        for (let i = 0; i < blue.length; i++) {
            const currCoord = blue[i];
            const nextCoord = blue[i + 1];
            if (nextCoord) {
                if (currCoord[1] === nextCoord[1]) check++;
                if (currCoord[0] === nextCoord[0]) check++;
            };
        };

        for (let i = 0; i < red.length; i++) {
            let initialCoord = red[i];

            for (let j = 0; j < red.length; j++) {
                let currCoord = red[j];

                if (initialCoord[0] + 2 === currCoord[0]) {
                    // run blue loop and check for blue row pair and check += 2
                    for (let x = 0; x < blue.length; x++) {
                        const currBlue = blue[x];
                        const nextBlue = blue[x + 1];

                        if (nextBlue) {
                            if (currBlue[0] === nextBlue[0]) check += 2;
                        };
                    };
                };

                if (initialCoord[1] + 2 === currCoord[1]) {
                    // run blue loop and check for blue column pair and check += 2
                    for (let x = 0; x < blue.length; x++) {
                        const currBlue = blue[x];
                        const nextBlue = blue[x + 1];

                        if (nextBlue) {
                            if (currBlue[1] === nextBlue[1]) check += 2;
                        };
                    };
                };
            };
        };

        for (let i = 0; i < blue.length; i++) {
            let initialCoord = blue[i];

            for (let j = 0; j < blue.length; j++) {
                let currCoord = blue[j];

                if (initialCoord[0] + 2 === currCoord[0]) {
                    // run red loop and check for red row pair and check += 2
                    for (let x = 0; x < red.length; x++) {
                        const currRed = red[x];
                        const nextRed = red[x + 1];

                        if (nextRed) {
                            if (currRed[0] === nextRed[0]) check += 2;
                        };
                    };
                };

                if (initialCoord[1] + 2 === currCoord[1]) {
                    // run red loop and check for red column pair and check += 2
                    for (let x = 0; x < red.length; x++) {
                        const currRed = red[x];
                        const nextRed = red[x + 1];

                        if (nextRed) {
                            if (currRed[1] === nextRed[1]) check += 2;
                        };
                    };
                };
            };
        };

        if (check >= 2) return false;

        return true;
    };

    generateBoard() {
        const board = this.generateGrid();
        const colors = [];
        const coordinates = this.getCoordinates();

        const colorCoords = {
            0: [],
            1: []
        };

        coordinates.forEach(coordinate => {
            const color = this.randomColorGenerator();

            colors.push(color);
            colorCoords[color].push(coordinate);
        });

        if (this.checkBoard(colorCoords)) {
            coordinates.forEach(coordinate => {
                let [currRow, currCol] = coordinate;
                board[currRow][currCol] = colors.shift();
            });

            this.grid = board;
            return board;
        };

        this.generateBoard();
    };

    tileValue(row, col) {
        return this.fillBoard[row][col];
    };

    // checkWin(board) {
        
    // };
};