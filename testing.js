// randomTileGenerator = () => {
//     const rows = [1, 2, 3, 4];
//     const cols = [1, 2, 3, 4];

//     const randRow = rows[Math.floor(Math.random() * rows.length)];
//     const randCol = cols[Math.floor(Math.random() * cols.length)];

//     const rowOrCol = ['r', 'c'];
//     const randRowOrCol = rowOrCol[Math.floor(Math.random() * rowOrCol.length)];

//     const getTile = el => {
//         if (el === 'r') return randRow;
//         if (el === 'c') return randCol;
//     };

//     const tile = `${randRowOrCol}:${getTile(randRowOrCol)}`;

//     return tile;
// };

// const randomRowGenerator = () => {
//     const rows = [1, 2, 3, 4];
//     const randRow = rows[Math.floor(Math.random() * rows.length)];
//     const row = `r${randRow}`;

//     return row;
// };

// const randomColGenerator = () => {
//     const cols = [1, 2, 3, 4];
//     const randCol = cols[Math.floor(Math.random() * cols.length)];
//     const col = `c${randCol}`;

//     return col;
// };

// console.log(randomRowGenerator());
// console.log(randomColGenerator());

// const randomTotalGenerator = () => {
//     let randomTotal = [4, 5];
//     let randomIndex = Math.floor(Math.random() * randomTotal.length);

//     return randomTotal[randomIndex];
// };

// const randomRowGenerator = () => {
//     const rows = [1, 2, 3, 4];
//     const randRow = rows[Math.floor(Math.random() * rows.length)];
//     const row = `r${randRow}`;

//     return row;
// };

// const randomColGenerator = () => {
//     const cols = [1, 2, 3, 4];
//     const randCol = cols[Math.floor(Math.random() * cols.length)];
//     const col = `c${randCol}`;

//     return col;
// };

// const generateTiles = () => {
//     const randomTotal = randomTotalGenerator();
//     const visited = new Set();

//     const myTiles = {
//         r1: 0,
//         r2: 0,
//         r3: 0,
//         r4: 0,
//         c1: 0,
//         c2: 0,
//         c3: 0,
//         c4: 0,
//         total: randomTotal
//     };

//     let randomRow = randomRowGenerator();
//     let randomCol = randomColGenerator();

//     // while (myTiles.total > 0) {
//     //     if (myTiles[randomRow] < 2 && myTiles[randomCol] < 2 && !visited.has([randomRow, randomCol])) {
//     //         myTiles[randomRow]++;
//     //         myTiles[randomCol]++;

//     //         visited.add([randomRow, randomCol]);
//     //         myTiles.total--;
//     //     };
//     // };
//     while (myTiles.total > 0) {
//         if (myTiles[randomRow] < 2 && !visited.has(randomRow)) {
//             myTiles[randomRow]++;

//             visited.add(randomRow);
//             myTiles.total--;
//         };

//         if (myTiles[randomCol] < 2 && !visited.has(randomCol)) {
//             myTiles[randomCol]++;

//             visited.add(randomCol);
//             myTiles.total--;
//         };

//         myTiles.total--;
//     };

//     return myTiles;
// };

// console.log(generateTiles())

// const randomTotalGenerator = () => {
//     let randomTotal = [4, 5];
//     let randomIndex = Math.floor(Math.random() * randomTotal.length);

//     return randomTotal[randomIndex];
// };

// const randomTileGenerator = () => {
//     const rows = [1, 2, 3, 4];
//     const cols = [1, 2, 3, 4];

//     const randRow = rows[Math.floor(Math.random() * rows.length)];
//     const randCol = cols[Math.floor(Math.random() * cols.length)];

//     const tile = [`r${randRow}`, `c${randCol}`];

//     return tile;
// };

// const checkTile = (obj, tile) => {
//     const visited = new Set();

//     while (visited.has(tile) && !obj[tile[0]] < 2 && !obj[tile[1]] < 2) {
//         tile = randomTileGenerator();

//         if (obj[tile[0]] < 2 && obj[tile[1]] < 2 && !visited.has(obj[tile])) return tile;
//     };
// };


// Alternate, doesn't always work

// const checkTile = (obj, tile = randomTileGenerator(), visited = new Set()) => {
//     if (obj[tile[0]] < 2 && obj[tile[1]] < 2 && !visited.has(obj[tile])) return tile;

//     visited.add(tile);

//     return checkTile(obj, tile, visited);
// };

// const checkTile = (obj, visited = new Set()) => {
//     let tile = randomTileGenerator();

//     if (obj[tile[0]] < 2 && obj[tile[1]] < 2 && !visited.has(obj[tile])) return tile;

//     visited.add(tile);

//     return checkTile(obj, visited);
// };

// const generateTiles = () => {
//     const randomTotal = randomTotalGenerator();

//     const myTiles = {
//         r1: 0,
//         r2: 0,
//         r3: 0,
//         r4: 0,
//         c1: 0,
//         c2: 0,
//         c3: 0,
//         c4: 0,
//         total: randomTotal
//     };

//     while (myTiles.total > 0) {
//         const tile = checkTile(myTiles);

//         myTiles[tile[0]]++;
//         myTiles[tile[1]]++;

//         myTiles.total--;
//     };

//     return myTiles;
// };

// console.log(generateTiles())


const randomTotalGenerator = () => {
    let randomTotal = [4, 5];
    let randomIndex = Math.floor(Math.random() * randomTotal.length);

    return randomTotal[randomIndex];
};

const randomTileGenerator = () => {
    const rows = [1, 2, 3, 4];
    const cols = [1, 2, 3, 4];

    const randRow = rows[Math.floor(Math.random() * rows.length)];
    const randCol = cols[Math.floor(Math.random() * cols.length)];

    const tile = [`r${randRow}`, `c${randCol}`];

    return tile;
};

const checkTile = (obj, visited = new Set()) => {
    let tile = randomTileGenerator();

    if (obj[tile[0]] < 2 && obj[tile[1]] < 2 && !visited.has(obj[tile])) return tile;

    visited.add(tile);

    return checkTile(obj, visited);
};

const generateTiles = () => {
    const randomTotal = randomTotalGenerator();

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
        const tile = checkTile(myTiles);

        myTiles[tile[0]]++;
        myTiles[tile[1]]++;

        myTiles.total--;
    };

    return myTiles;
};

const populateBoard = () => {
    const grid = [];
    const tiles = generateTiles();
    const values = Object.values(tiles);
    const rows = Object.values(tiles).splice(0, 4);
    const cols = Object.values(tiles).splice(4, 4);

    console.log(values)
    console.log(rows)
    console.log(cols)

    // for (let i = 0; i < this.numRows; i++) {
    //     grid.push()
    //     for (let j = 0; j < this.numCols; j++)
    // };

    // return grid;
};

console.log(populateBoard())