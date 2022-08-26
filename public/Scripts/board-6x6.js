export default class Board6x6 {
    constructor() {
        this.currentGrid = [];
        this.stats = {
            Function1: 0,
            Function2: 0,
            Function3: 0,
            Function4: 0
        };
        // while should run as long as assembleGrid !== null
        // Wrap this.checkCols in while loop, look for return value => good; else return undefined 
        // Check within each function, if undefined is ever given, return all the way back up
        // If undefined, run functions again
        // Set stats back to 0
        // On every recursive call to assembleGrid, check this.stats(func1)
        this.assembledBoard = this.checkColumnsUnique();
    };

    assembleRows(row = []) {
        this.stats.Function1++;

        const permutations = [[1, 0], [1, 1], [0, 1], [0, 0]];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * permutations.length);
    
            row.push(...permutations[randomIndex]);
        };
    
        for (let i = 0; i < row.length; i++) {
            const first = row[i];
            const second = row[i + 1];
            const third = row[i + 2];
            
            if (first + second + third === 0) return this.assembleRows();
            if (first + second + third === 3) return this.assembleRows();
        };
    
        let total = 0;
        row.forEach(val => total += val);
        if (total === 3) return row;
        
        return this.assembleRows();
    };
    
    assembleGrid(visited = new Set(), grid = []) {
        this.stats.Function2++;
        while (grid.length < 6) {
            const randomRow = this.assembleRows();
            if (!visited.has(randomRow.join(''))) {
                visited.add(randomRow.join(''))
                grid.push(randomRow);
            };
        };
    
        const cols = { c0: [], c1: [], c2: [], c3: [], c4: [], c5: [] };
            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[row].length; col++) {
                    let currCol = `c${col}`;
        
                    cols[currCol].push(grid[row][col]);
                };
            };
    
            const colValues = Object.values(cols);
            for (let row = 0; row < colValues.length; row++) {
                for (let col = 0; col < colValues[row].length; col++) {
                    const first = colValues[row][col];
                    const second = colValues[row][col + 1];
                    const third = colValues[row][col + 2];
                    
                    if (first + second + third === 0) return this.assembleGrid();
                    if (first + second + third === 3) return this.assembleGrid();
                };
            };
    
        return grid;
    };
    
    checkColumnTotals() {
        this.stats.Function3++;
        const values = { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 };
    
        const grid = this.assembleGrid();
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                const currCol = `c${col}`
                let currColVal = grid[row][col];
    
                values[currCol] += currColVal;
            };
        };
    
        let check = 0;
        Object.values(values).forEach(val => {if (Number(val) === 3) check++});
    
        if (check === 6) return grid;
    
        return this.checkColumnTotals();
    };
    
    checkColumnsUnique(visited = new Set()) {
        this.stats.Function4++;
        const cols = { c0: [], c1: [], c2: [], c3: [], c4: [], c5: [] };
    
        const grid = this.checkColumnTotals();
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                let currCol = `c${col}`;
    
                cols[currCol].push(grid[row][col]);
            };
        };
    
        const colValues = Object.values(cols);
        for (let col = 0; col < colValues.length; col++) {
                let currCol = Number(colValues[col].join(''));
    
                if (visited.has(currCol)) return this.checkColumnsUnique();
                visited.add(currCol);
        };
    
        this.currentGrid = grid;
        return grid;
    };
    
    randomTotalGenerator() {
        const randomTotal = [21, 24];
        const randomIndex = Math.floor(Math.random() * randomTotal.length);
    
        return randomTotal[randomIndex];
    };
    
    randomTileFinder() {
        const randRow = Math.floor(Math.random() * 6);
        const randCol = Math.floor(Math.random() * 6);
    
        const tile = [`r${randRow}`, `c${randCol}`];
    
        if (this.currentGrid[randRow][randCol] !== null) return tile;
    
        return this.randomTileFinder();
    };
    
    checkObj (obj) {
        const tile = this.randomTileFinder();
        const [row, col] = tile;
    
        if (obj[row] > 0 && obj[col] > 0) return tile;
    
        return this.checkObj(obj);
    };
    
    reduceTiles() {
        const randomTotal = this.randomTotalGenerator();
    
        const tileTracker = { r0: 6, r1: 6, r2: 6, r3: 6, r4: 6, r5: 6, c0: 6, c1: 6, c2: 6, c3: 6, c4: 6, c5: 6, total: randomTotal };
    
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
        return this.currentGrid[row][col];
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

    endGameRowsUnique(board) {
        const rows = { r0: [], r1: [], r2: [], r3: [], r4: [], r5: [] };

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

    endGameColsUnique(board) {
        const cols = { c0: [], c1: [], c2: [], c3: [], c4: [], c5: [] };

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

    endGameRowTotals(board) {
        const values = { r0: 0, r1: 0, r2: 0, r3: 0, r4: 0, r5: 0 };

        for (let row = 0; row < board.length; row++) {
            const currRow = `r${row}`
            for (let col = 0; col < board[row].length; col++) {
                let currColVal = board[row][col];

                values[currRow] += currColVal;
            };
        };

        let check = 0;
        Object.values(values).forEach(val => {if (Number(val) === 3) check++});

        if (check === 6) return true;
        return false;
    };

    endGameColTotals(board) {
        const values = { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 };

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const currCol = `c${col}`
                let currColVal = board[row][col];

                values[currCol] += currColVal;
            };
        };

        let check = 0;
        Object.values(values).forEach(val => {if (Number(val) === 3) check++});

        if (check === 6) return true;
        return false;
    };

    checkWin(board) {
        const incomplete = document.getElementById('incomplete');
        if (this.isBoardFull(board)) {
            if (this.endGameRowsUnique(board)) {
                if (this.endGameColsUnique(board)) {
                    if (this.endGameRowTotals(board)) {
                        if (this.endGameColTotals(board)) {
                            incomplete.innerText = '';
                            return true;
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
        return false;
    };

    setWin(board) {
        let wins = 0;
        if (sessionStorage.getItem('hasWon')) wins = sessionStorage.getItem('hasWon');

        if (this.checkWin(board)) {
            wins++;
            sessionStorage.setItem('hasWon', wins);

            document.getElementById('timer-current').style.opacity = '0%';
            document.getElementById('timer-best').style.opacity = '0%';

            const buttons = document.querySelectorAll('.buttons');
            buttons.forEach(button => {
                button.style.opacity = '0.8';
                button.style.bottom = '90px';
                button.disabled = true;
            });
            
            const gameWin = document.getElementById('game-win');
            gameWin.style.display = 'block';
        };
    };

    setBest(board, currMin, currSec, bestMin, bestSec) {
        if (this.checkWin(board)) {
            if (sessionStorage.getItem('hasWon') > 1) {
                if (Number(currMin.innerText) >= Number(bestMin.innerText) && Number(currSec.innerText) >= Number(bestSec.innerText)) return;
                if (Number(currMin.innerText) > Number(bestMin.innerText) && Number(currSec.innerText) <= Number(bestSec.innerText)) return;
            };

            sessionStorage.setItem('bestMinute', currMin.innerText);
            sessionStorage.setItem('bestSecond', currSec.innerText);
        };
    };
};