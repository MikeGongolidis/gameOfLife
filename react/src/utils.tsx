type Coordinate = [number, number];

type Cell = {
    x: number;
    y: number;
    alive: boolean;
  };

export function generateInitialCells(gridSize: number, randomizeStart:boolean) {
    const initialCells: Cell[] = [];
    const aCells: Coordinate[] = [];
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const cell = {
                x,
                y,
                alive: randomizeStart ? Math.random() < 0.12 : false,
            };

            initialCells.push(cell);
            if (randomizeStart && cell.alive) {
                aCells.push([cell.x, cell.y]);
            }
        }
    }
    return { initialCells, aCells };
}

export function cellIteration(cells: Cell[], gridSize: number, aliveCells: Coordinate[]) {
    const cellCopy: Cell[] = [];
    const aCells: Coordinate[] = [];
    //For each cell
    cells.forEach((cell) => {
        const aliveNeighbors = countAliveNeighbors(cell, gridSize, aliveCells);
        // Apply the rules of the Game of Life to update the cell state in the new grid
        if (cell.alive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
            cell.alive = true;
            cellCopy.push(cell);
            aCells.push([cell.x, cell.y]);
        } else if (!cell.alive && aliveNeighbors === 3) {
            cell.alive = true;
            cellCopy.push(cell);
            aCells.push([cell.x, cell.y]);
        } else {
            cell.alive = false;
            cellCopy.push(cell);
        }
    });
    return { cellCopy, aCells };
}

export function renderCells(
    ctx: CanvasRenderingContext2D | null ,
    cells: Cell[],
    cellSize: number,
    colors: {
        alive: string;
        dead: string;
    },
    ){
        if (!ctx) {
            return;
        }
        cells.forEach((cell) => {
            ctx.fillStyle = cell.alive ? colors.alive : colors.dead;
            ctx.fillRect(
                cell.x * cellSize ,
                cell.y * cellSize ,
                cellSize,
                cellSize
            );
            
        });
}


export function countAliveNeighbors(cell:Cell, gridSize: number,aliveCells:Coordinate[]){
    const neighbors: Coordinate[] = [
        [cell.x-1, cell.y-1],
        [cell.x, cell.y-1],
        [cell.x+1, cell.y-1],
        [cell.x-1, cell.y],
        [cell.x+1, cell.y],
        [cell.x-1, cell.y+1],
        [cell.x, cell.y+1],
        [cell.x+1, cell.y+1]
      ];
      return neighbors.filter(([i, j]) => {
        return i >= 0 && j >= 0 && i < gridSize && j < gridSize && aliveCells.some((c) => c[0] === i && c[1] === j);
      }).length;
}