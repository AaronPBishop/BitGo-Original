export default class Board4x4 {
    constructor() {
        this.numRows = 4;
        this.numCols = 4;
        this.currentGrid = [];
        this.fillBoard = this.checkColumnsUnique();
    };

    randomRowGenerator(row = []) {
        if (row.length === 4) {
            let total = 0;
            row.forEach(val => total += val);
    
            if (total === 2) return row;
            else {
                row = [];
                return this.randomRowGenerator(row);
            };
        };
    
        row.push(Math.floor(Math.random() * 2));
    
        return this.randomRowGenerator(row);
    };
    
    generateGrid(visited = new Set(), grid = []) {
        if (grid.length === 4) return grid;
    
        const randomRow = this.randomRowGenerator();
        if (!visited.has(randomRow.join(''))) {
            visited.add(randomRow.join(''))
            grid.push(randomRow);
        };
    
        return this.generateGrid(visited, grid);
    };
    
    checkTotalCol() {
        const values = {
            c0: 0,
            c1: 0,
            c2: 0,
            c3: 0
        };
    
        const grid = this.generateGrid();
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                const currCol = `c${col}`
                let currColVal = grid[row][col];
    
                values[currCol] += currColVal;
            };
        };
    
        let check = 0;
        Object.values(values).forEach(val => {if (Number(val) === 2) check++});
    
        if (check === 4) return grid;
    
        return this.checkTotalCol();
    };
    
    checkColumnsUnique(visited = new Set()) {
        const cols = {
            c0: [],
            c1: [],
            c2: [],
            c3: []
        };
    
        const grid = this.checkTotalCol();
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                let currCol = `c${col}`;
    
                cols[currCol].push(grid[row][col]);
            };
        };
    
        const colValues = Object.values(cols);
        for (let col = 0; col < colValues.length; col++) {
                let currCol = Number(colValues[col].join(''));
    
                if (visited.has(currCol)) return checkColumnsUnique(visited);
                visited.add(currCol);
        };
    
        this.currentGrid = grid;
        return grid;
    };
    
    randomTotalGenerator() {
        const randomTotal = [11, 12];
        const randomIndex = Math.floor(Math.random() * randomTotal.length);
    
        return randomTotal[randomIndex];
    };
    
    randomTileFinder() {
        const randRow = Math.floor(Math.random() * 4);
        const randCol = Math.floor(Math.random() * 4);
    
        const tile = [`r${randRow}`, `c${randCol}`];
    
        if (this.currentGrid[randRow][randCol] !== null) return tile;
    
        return this.randomTileFinder();
    };
    
    checkObj (obj) {
        const tile = this.randomTileFinder();
        const [row, col] = tile;
    
        if (obj[row] > 0 && obj[col] > 0) {
            return tile;
        };
    
        return this.checkObj(obj);
    };
    
    reduceTiles() {
        const randomTotal = this.randomTotalGenerator();
    
        const tileTracker = {
            r0: 4,
            r1: 4,
            r2: 4,
            r3: 4,
            c0: 4,
            c1: 4,
            c2: 4,
            c3: 4,
            total: randomTotal
        };
    
        while (tileTracker.total > 0) {
            const currTile = this.checkObj(tileTracker);
            const [row, col] = currTile;
    
            let rowNum = row.split('').splice(1, 1).join('');
            let colNum = col.split('').splice(1, 1).join('');
            this.currentGrid[rowNum][colNum] = null;
    
            tileTracker[row]--;
            tileTracker[col]--;
    
            tileTracker.total--;
        };
    
        return this.currentGrid;
    };

    tileValue(row, col) {
        return this.fillBoard[row][col];
    };

    isBoardFull(board) {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                let currTile = board[row][col];

                if (currTile === null) return false;
            };
        };

        return true;
    };

    winCheckRows(board) {
        const rows = {
            r0: [],
            r1: [],
            r2: [],
            r3: []
        };

        for (let row = 0; row < board.length; row++) {
            let currRow = `r${row}`;
            for (let col = 0; col < board[row].length; col++) {
                rows[currRow].push(this.currentGrid[row][col]);
            };
        };

        const rowValues = Object.values(rows);
        const visited = new Set();
        for (let row = 0; row < rowValues.length; row++) {
                let currRow = Number(rowValues[row].join(''));

                if (visited.has(currRow)) return false;
                visited.add(currRow);
        };

        return true;
    };

    winCheckCols(board) {
        const cols = {
            c0: [],
            c1: [],
            c2: [],
            c3: []
        };

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                let currCol = `c${col}`;

                cols[currCol].push(this.currentGrid[row][col]);
            };
        };

        const colValues = Object.values(cols);
        const visited = new Set();
        for (let col = 0; col < colValues.length; col++) {
                let currCol = Number(colValues[col].join(''));

                if (visited.has(currCol)) return false;
                visited.add(currCol);
        };

        return true;
    };

    winCheckTotalRow(board) {
        const values = {
            r0: 0,
            r1: 0,
            r2: 0,
            r3: 0
        };

        for (let row = 0; row < board.length; row++) {
            const currRow = `r${row}`
            for (let col = 0; col < board[row].length; col++) {
                let currColVal = board[row][col];

                values[currRow] += currColVal;
            };
        };

        let check = 0;
        Object.values(values).forEach(val => {if (Number(val) === 2) check++});

        if (check === 4) return true;
        return false;
    };

    winCheckTotalCol(board) {
        const values = {
            c0: 0,
            c1: 0,
            c2: 0,
            c3: 0
        };

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const currCol = `c${col}`
                let currColVal = board[row][col];

                values[currCol] += currColVal;
            };
        };

        let check = 0;
        Object.values(values).forEach(val => {if (Number(val) === 2) check++});

        if (check === 4) return true;
        return false;
    };

    checkWin(board) {
        const incomplete = document.getElementById('incomplete');
        if (this.isBoardFull(board)) {
            if (this.winCheckRows(board)) {
                if (this.winCheckCols(board)) {
                    if (this.winCheckTotalRow(board)) {
                        if (this.winCheckTotalCol(board)) {
                            incomplete.innerText = '';
                            document.getElementById('current-minute').style.display = 'none';
                            document.getElementById('current-second').style.display = 'none';
                            document.getElementById('delimiter').style.display = 'none';

                            const buttons = document.querySelectorAll('.buttons');
                            buttons.forEach(button => {
                                button.style.opacity = '0.8';
                                button.style.bottom = '0px';
                                button.style.top = '10px';
                                button.disabled = true;
                            });

                            const gameWin = document.getElementById('game-win');
                            gameWin.style.display = 'block';
                        } else {
                            incomplete.innerText = 'Columns must have an even number of tiles';
                        };
                    } else {
                        incomplete.innerText = 'Rows must have an even number of tiles';
                    };
                } else {
                    incomplete.innerText = 'Each column must be unique';
                };
            } else {
                incomplete.innerText = 'Each row must be unique';
            };
        } else {
            incomplete.innerText = '';
        };
    };
};