import Cell from "./Cell";

const GRID_SIZE = 4;

export default class Board {
    private _cells: Cell[] = [];
    private _element: HTMLElement;

    constructor(element: HTMLElement | null) {
        if (element == null) throw new Error("Board cannot be null");
        element.style.setProperty("--grid-size", GRID_SIZE.toString());
        this._element = element;

        Array(GRID_SIZE * GRID_SIZE)
            .fill(0)
            .map((_, i: number) => {
                const cell = new Cell(i % GRID_SIZE, Math.floor(i / GRID_SIZE));
                this._element.append(cell.element);
                this._cells.push(cell);
            });
    }

    public get element(): HTMLElement {
        return this._element;
    }

    public get cells(): Cell[] {
        return this._cells;
    }

    private get emptyCells(): Cell[] {
        return this.cells.filter((cell) => cell.tile === null);
    }

    public randomEmptyCell(): Cell {
        const randomIndex = Math.floor(Math.random() * this.emptyCells.length);
        return this.emptyCells[randomIndex];
    }

    public get cellsByRow(): Cell[][] {
        return this.cells.reduce((grid: Cell[][], cell: Cell) => {
            grid[cell.y] = grid[cell.y] || [];
            grid[cell.y][cell.x] = cell;
            return grid;
        }, []);
    }

    public get cellsByColumn(): Cell[][] {
        return this.cells.reduce((grid: Cell[][], cell: Cell) => {
            grid[cell.x] = grid[cell.x] || [];
            grid[cell.x][cell.y] = cell;
            return grid;
        }, []);
    }
}
