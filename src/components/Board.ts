import Cell from "./Cell";

export default class Board {
    private _cells: Cell[] = [];
    private readonly _element: HTMLElement;
    public static gridSize: number = 4;

    constructor(element: HTMLElement | null) {
        if (element == null) throw new Error("Board cannot be null");
        element.style.setProperty("--grid-size", `${Board.gridSize}`);
        document.body.style.setProperty("--f-size", `${Board.gridSize / (Board.gridSize - 2.4)}rem`);
        this._element = element;

        Array(Board.gridSize * Board.gridSize)
            .fill(0)
            .map((_, i: number) => {
                const cell = new Cell(i % Board.gridSize, Math.floor(i / Board.gridSize));
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
