const randomRowGenerator = (row = []) => {
    if (row.length === 4) {
        let total = 0;
        row.forEach(val => total += val);

        if (total === 2) return row;
        else {
            row = [];
            return randomRowGenerator(row);
        };
    };

    row.push(Math.floor(Math.random() * 2));

    return randomRowGenerator(row);
};

const generateGrid = (visited = new Set(), grid = []) => {
    if (grid.length === 4) return grid;

    const randomRow = randomRowGenerator();
    if (!visited.has(randomRow.join(''))) {
        visited.add(randomRow.join(''))
        grid.push(randomRow);
    };

    return generateGrid(visited, grid);
};

const checkTotalCol = () => {
    const values = {
        c0: 0,
        c1: 0,
        c2: 0,
        c3: 0
    };

    const grid = generateGrid();
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

    return checkTotalCol();
};

const checkColumnsUnique = (visited = new Set()) => {
    const cols = {
        c0: [],
        c1: [],
        c2: [],
        c3: []
    };

    const grid = checkTotalCol();
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

    this.currentGrid = grid
    return grid;
};

const randomTotalGenerator = () => {
    let randomTotal = [11, 12];
    let randomIndex = Math.floor(Math.random() * randomTotal.length);

    return randomTotal[randomIndex];
};

const randomTileFinder = () => {
    const randRow = Math.floor(Math.random() * 4);
    const randCol = Math.floor(Math.random() * 4);

    const grid = checkColumnsUnique();
    const tile = [`r${randRow}`, `c${randCol}`];

    if (grid[randRow][randCol] !== null) return [grid, tile];

    return randomTileFinder();
};

const checkTile = (obj) => {
    const grid = randomTileFinder()[0];
    const tile = randomTileFinder()[1];
    const [row, col] = tile;

    if (obj[row] > 2 && obj[col] > 2) {
        return [grid, tile];
    };


    return checkTile(obj);
};

const reduceTiles = () => {
    const randomTotal = randomTotalGenerator();
    let finalGrid;

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
        const grid = checkTile(tileTracker)[0];
        const currTile = checkTile(tileTracker)[1];
        const [row, col] = currTile;

        let rowNum = row.split('').splice(1, 1).join('');
        let colNum = col.split('').splice(1, 1).join('');
        grid[rowNum][colNum] = null;

        finalGrid = grid;

        tileTracker[row]--;
        tileTracker[col]--;

        tileTracker.total--;
    };

    return finalGrid;
};