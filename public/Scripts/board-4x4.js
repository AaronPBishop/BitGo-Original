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
        let red = Object.values(clrCrds[0]);
        let blue = Object.values(clrCrds[1]);

        let check = 0;

        // Check for red pairs in col/row
        for (let i = 0; i < red.length; i++) {
            const currCoord = red[i];
            const nextCoord = red[i + 1];
            if (nextCoord) {
                if (currCoord[1] === nextCoord[1]) check++;
                if (currCoord[0] === nextCoord[0]) check++;
            };
        };

        // Check for blue pairs in col/row
        for (let i = 0; i < blue.length; i++) {
            const currCoord = blue[i];
            const nextCoord = blue[i + 1];
            if (nextCoord) {
                if (currCoord[1] === nextCoord[1]) check++;
                if (currCoord[0] === nextCoord[0]) check++;
            };
        };

        // Check for red tiles seperated by one row/col with a blue pair in-between
        for (let i = 0; i < red.length; i++) {
            const initialCoord = red[i];

            for (let j = 0; j < red.length; j++) {
                const currCoord = red[j];

                if (initialCoord[0] + 2 === currCoord[0]) {
                    // run blue loop and check for blue row pair
                    for (let x = 0; x < blue.length; x++) {
                        const currBlue = blue[x];
                        const nextBlue = blue[x + 1];

                        if (nextBlue) {
                            if (currBlue[0] === nextBlue[0] && currBlue[0] === initialCoord[0] + 1 || currBlue[0] === initialCoord[0] + 3) check += 2;
                        };
                    };
                };

                if (initialCoord[1] + 2 === currCoord[1]) {
                    // run blue loop and check for blue column pair
                    for (let x = 0; x < blue.length; x++) {
                        const currBlue = blue[x];
                        const nextBlue = blue[x + 1];

                        if (nextBlue) {
                            if (currBlue[1] === nextBlue[1] && currBlue[1] === initialCoord[1] + 1 || currBlue[1] === initialCoord[1] + 3) check += 2;
                        };
                    };
                };
            };
        };

        // Check for blue tiles seperated by one row/col with a red pair in-between
        for (let i = 0; i < blue.length; i++) {
            const initialCoord = blue[i];

            for (let j = 0; j < blue.length; j++) {
                const currCoord = blue[j];

                if (initialCoord[0] + 2 === currCoord[0]) {
                    // run red loop and check for red row pair
                    for (let x = 0; x < red.length; x++) {
                        const currRed = red[x];
                        const nextRed = red[x + 1];

                        if (nextRed) {
                            if (currRed[0] === nextRed[0] && currRed[0] === initialCoord[0] + 1 || currRed[0] === initialCoord[0] + 3) check += 2;
                        };
                    };
                };

                if (initialCoord[1] + 2 === currCoord[1]) {
                    // run red loop and check for red column pair
                    for (let x = 0; x < red.length; x++) {
                        const currRed = red[x];
                        const nextRed = red[x + 1];

                        if (nextRed) {
                            if (currRed[1] === nextRed[1] && currRed[1] === initialCoord[1] + 1 || currRed[1] === initialCoord[1] + 3) check += 2;
                        };
                    };
                };
            };
        };

        // Check for red 'Y' patterns and a rogue blue tile
        if (red.length === 4 && blue.length === 1) {
            for (let i = 0; i < red.length; i++) {
                let initialCoord = red[i];
    
                for (let j = 0; j < red.length; j++) {
                    let currCoord = red[j];
    
                    if (initialCoord[0] + 2 === currCoord[0]) {
                        for (let x = 0; x < red.length; x++) {
                            const currRed = red[x];
                            const nextRed = red[x + 1];
    
                            if (nextRed) {
                                if (currRed[0] === nextRed[0] && currRed[0] === initialCoord[0] + 1) check += 2;
                            };
                        };
                    };
    
                    if (initialCoord[1] + 2 === currCoord[1]) {
                        for (let x = 0; x < red.length; x++) {
                            const currRed = red[x];
                            const nextRed = red[x + 1];
    
                            if (nextRed) {
                                if (currRed[1] === nextRed[1] && currRed[1] === initialCoord[1] + 1) check += 2;
                            };
                        };
                    };
                };
            };
        };

        // Check for blue 'Y' patterns and a rogue red tile
        if (blue.length === 4 && red.length === 1) {
            for (let i = 0; i < blue.length; i++) {
                let initialCoord = blue[i];
    
                for (let j = 0; j < blue.length; j++) {
                    let currCoord = blue[j];
    
                    if (initialCoord[0] + 2 === currCoord[0]) {
                        for (let x = 0; x < blue.length; x++) {
                            const currblue = blue[x];
                            const nextblue = blue[x + 1];
    
                            if (nextblue) {
                                if (currblue[0] === nextblue[0] && currblue[0] === initialCoord[0] + 1) check += 2;
                            };
                        };
                    };
    
                    if (initialCoord[1] + 2 === currCoord[1]) {
                        for (let x = 0; x < blue.length; x++) {
                            const currblue = blue[x];
                            const nextblue = blue[x + 1];
    
                            if (nextblue) {
                                if (currblue[1] === nextblue[1] && currblue[1] === initialCoord[1] + 1) check += 2;
                            };
                        };
                    };
                };
            };
        }

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