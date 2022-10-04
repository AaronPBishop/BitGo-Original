export default class Board10x10 {
    constructor() {
        this.currentGrid = [];

        this.assembledBoard = this.makeBoard(10);
    };

    randValue() {
        if (Math.random() > 0.5) return 1;

        return 0;
    };
      
    tryMakeBoard(size) {
        const emptyGrid = new Array(size);

        const evenCount = (size / 2);
        
        for (let row = 0; row < size; row ++) {
          emptyGrid[row] = [];

          for (let col = 0; col < size; col ++) {
            let newBit = this.randValue();
            let valid = false;

            for (let tries = 0; tries < 2; tries++) {
              emptyGrid[row][col] = newBit;

              valid = col < 2 || !(emptyGrid[row][col] === emptyGrid[row][col - 1] && emptyGrid[row][col] === emptyGrid[row][col - 2]);

              if (!valid) { 
                newBit = Number(!newBit); 

                continue;
              };

              valid = row < 2 || !(emptyGrid[row][col] === emptyGrid[row - 1][col] && emptyGrid[row][col] === emptyGrid[row - 2][col]);

              if (!valid) { 
                newBit = Number(!newBit); 

                continue;
              };

              if (col === size -1) {
                let sum = 0;

                for (let i = 0; i <= col; i++) {
                  if (emptyGrid[row][i]) sum++;
                };

                if (sum !== evenCount) return false;
              };

              if (row === size -1) {
                let sum = 0;

                for (let i = 0; i <= row; i++) {
                  if (emptyGrid[i][col]) sum++;
                };

                if (sum !== evenCount) return false;
              };

              break; 
            };
           
            if (!valid) return false;
          };
        };
      
        const visited = new Set();

        for (let i = 0; i < size; i++) {
          visited.add(emptyGrid[i].join(''));
        };

        if (visited.size !== size) return false;

        visited.clear();

        for (let i = 0; i < size; i++) {
          visited.add(emptyGrid.map(tiles => tiles[i]).join(''))
        };

        if (visited.size !== size) return false;  

        return emptyGrid;
    };
      
    makeBoard(size, count = 10000000) {
        while (count > 0) {
            const board = this.tryMakeBoard(size); 

            if (board) this.currentGrid = board;

            count--;
        };

        return false;
    };
    
    randomTotalGenerator() {
        const randomTotal = [50, 48, 46, 44, 42];
        const randomIndex = Math.floor(Math.random() * randomTotal.length);
    
        return randomTotal[randomIndex];
    };
    
    randomTileFinder(grid) {
        const randRow = Math.floor(Math.random() * 10);
        const randCol = Math.floor(Math.random() * 10);
    
        const tile = [`r${randRow}`, `c${randCol}`];
    
        if (grid[randRow][randCol] !== null) return tile;
    
        return this.randomTileFinder(grid);
    };

    checkObj(rows, cols) {
        const rowValues = Object.values(rows);
        const colValues = Object.values(cols);
        for (let pillar = 0; pillar < rowValues.length; pillar++) {
            let currentRow = rowValues[pillar];
            let currentCol = colValues[pillar];
    
            let rowVals = 0;
            currentRow.forEach(val => {if (val !== null) rowVals++});
    
            let colVals = 0;
            currentCol.forEach(val => {if (val !== null) colVals++});
    
            if (rowVals > 8) return false;
            if (colVals > 8) return false;
        };

        return true;
    };
    
    reduceTiles() {
        let randomTotal = this.randomTotalGenerator();
        const grid = this.currentGrid.map(inner => inner.slice());
    
        while (randomTotal > 0) {
            const randomTile = this.randomTileFinder(grid);
            const [row, col] = randomTile;
    
            let rowNum = row.split('').splice(1, 1).join('');
            let colNum = col.split('').splice(1, 1).join('');
            grid[rowNum][colNum] = null;

            randomTotal--;
        };
    
        const rows = { r0: [], r1: [], r2: [], r3: [], r4: [], r5: [], r6: [], r7:[], r8: [], r9: [] };
        const cols = { c0: [], c1: [], c2: [], c3: [], c4: [], c5: [], c6: [], c7: [], c8: [], c9: [] };
        for (let row = 0; row < grid.length; row++) {
            let currRow = `r${row}`;
    
            for (let col = 0; col < grid[row].length; col++) {
                let currCol = `c${col}`;
    
                rows[currRow].push(grid[row][col]);
                cols[currCol].push(grid[row][col]);
            };
        };

        if (!this.checkObj(rows, cols)) return this.reduceTiles();
    
        this.currentGrid = grid;
        return grid;
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

    endGameRowTriplets(board) {
        const rows = { r0: [], r1: [], r2: [], r3: [], r4: [], r5: [], r6: [], r7: [], r8: [], r9: [] };
        for (let row = 0; row < board.length; row++) {
            let currRow = `r${row}`;
            for (let col = 0; col < board[row].length; col++) {
                rows[currRow].push(this.currentGrid[row][col]);
            };
        };

        const rowValues = Object.values(rows);
        for (let row = 0; row < rowValues.length; row++) {
            for (let col = 0; col < rowValues[row].length; col++) {
                const first = rowValues[row][col];
                const second = rowValues[row][col + 1];
                const third = rowValues[row][col + 2];
                    
                if (first + second + third === 0) return false;
                if (first + second + third === 3) return false;
            };
        };

        return true;
    };

    endGameColTriplets(board) {
        const cols = { c0: [], c1: [], c2: [], c3: [], c4: [], c5: [], c6: [], c7: [], c8: [], c9: [] };
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                let currCol = `c${col}`;
        
                cols[currCol].push(board[row][col]);
            };
        };
    
        const colValues = Object.values(cols);
        for (let row = 0; row < colValues.length; row++) {
            for (let col = 0; col < colValues[row].length; col++) {
                const first = colValues[row][col];
                const second = colValues[row][col + 1];
                const third = colValues[row][col + 2];
                    
                if (first + second + third === 0) return false;
                if (first + second + third === 3) return false;
            };
        };

        return true;
    };

    endGameRowsUnique(board) {
        const rows = { r0: [], r1: [], r2: [], r3: [], r4: [], r5: [], r6: [], r7: [], r8: [], r9: [] };
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
        const cols = { c0: [], c1: [], c2: [], c3: [], c4: [], c5: [], c6: [], c7: [], c8: [], c9: [] };
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
        const values = { r0: 0, r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r6: 0, r7: 0, r8: 0, r9: 0 };

        for (let row = 0; row < board.length; row++) {
            const currRow = `r${row}`
            for (let col = 0; col < board[row].length; col++) {
                let currColVal = board[row][col];

                values[currRow] += currColVal;
            };
        };

        let check = 0;
        Object.values(values).forEach(val => {if (Number(val) === 5) check++});

        if (check === 10) return true;
        return false;
    };

    endGameColTotals(board) {
        const values = { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0, c6: 0, c7: 0, c8: 0, c9: 0 };

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const currCol = `c${col}`
                let currColVal = board[row][col];

                values[currCol] += currColVal;
            };
        };

        let check = 0;
        Object.values(values).forEach(val => {if (Number(val) === 5) check++});

        if (check === 10) return true;
        return false;
    };

    checkWin(board) {
        const incomplete = document.getElementById('incomplete');
        if (this.isBoardFull(board)) {
            if (this.endGameRowTriplets(board)) {
                if (this.endGameColTriplets(board)) {
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
                    incomplete.innerText = 'More than two same-color consecutive tiles in a column are not allowed';
                };
            } else {
                incomplete.innerText = 'More than two same-color consecutive tiles in a row are not allowed';
            };
        } else {
            incomplete.innerText = '';
        };

        return false;
    };

    setWin(board) {
        let wins = 0;
        if (sessionStorage.getItem('hasWon-10x10')) wins = sessionStorage.getItem('hasWon-10x10');

        if (this.checkWin(board)) {
            wins++;
            sessionStorage.setItem('hasWon-10x10', wins);

            document.getElementById('timer-current').style.opacity = '0%';
            document.getElementById('timer-best').style.opacity = '0%';

            const buttons = document.querySelectorAll('.buttons');
            buttons.forEach(button => {
                button.style.opacity = '0.8';
                button.style.bottom = '110px';
                button.style.borderBottom = 'none'
                button.disabled = true;
            });
            
            const gameWin = document.getElementById('game-win');
            gameWin.style.display = 'block';
        };
    };

    setBest(board, currMin, currSec, bestMin, bestSec) {
        if (this.checkWin(board)) {
            if (sessionStorage.getItem('hasWon-10x10') > 1) {
                if (Number(currMin.innerText) >= Number(bestMin.innerText) && Number(currSec.innerText) >= Number(bestSec.innerText)) return;
                if (Number(currMin.innerText) > Number(bestMin.innerText) && Number(currSec.innerText) <= Number(bestSec.innerText)) return;
            };

            sessionStorage.setItem('bestMinute-10x10', currMin.innerText);
            sessionStorage.setItem('bestSecond-10x10', currSec.innerText);
        };
    };
};