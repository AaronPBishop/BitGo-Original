const assembleRows = (row = []) => {
    if (row.length === 4) {
        let total = 0;
        row.forEach(val => total += val);

        if (total === 2) return row;
        return assembleRows();
    };

    row.push(Math.floor(Math.random() * 2));

    return assembleRows(row);
};

const assembleGrid = (visited = new Set(), grid = []) => {
    if (grid.length === 4) return grid;

    const randomRow = assembleRows();
    if (!visited.has(randomRow.join(''))) {
        visited.add(randomRow.join(''))
        grid.push(randomRow);
    };

    return assembleGrid(visited, grid);
};

console.log(assembleGrid())