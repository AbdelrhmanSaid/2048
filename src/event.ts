import Board from "./components/Board";
import Cell from "./components/Cell";
import Tile from "./components/Tile";

interface FunctionMap {
    [key: string]: Function;
}

const keyMap: FunctionMap = {
    down: (board: Board) => {
        return board.cellsByColumn.map((column) => [...column].reverse());
    },
    right: (board: Board) => {
        return board.cellsByRow.map((row) => [...row].reverse());
    },
    up: (board: Board) => {
        return board.cellsByColumn;
    },
    left: (board: Board) => {
        return board.cellsByRow;
    },
};

export default class Events {
    private readonly _board: Board;
    private _events: FunctionMap = {};

    constructor(board: Board) {
        this._board = board;
        this.bindEvents();
    }

    public bindEvents() {
        window.addEventListener(
            "keydown",
            (e) => this.move(e.key.replace("Arrow", "").toLowerCase()),
            {once: true}
        );
    }

    private async move(direction: string) {
        if (this.isEnded()) return this.trigger("gameEnded");

        if (direction in keyMap) await this.slide(keyMap[direction](this._board));
        else this.bindEvents();
    }

    private isEnded(): boolean {
        return Object.keys(keyMap).every((direction) => {
            return !this.canMove(keyMap[direction](this._board));
        });
    }

    private canMove(cells: Cell[][]) {
        return cells.some((group: Cell[]) => {
            return group.some((cell: Cell, i: number) => {
                if (i === 0) return false;
                if (cell.tile === null) return false;
                return group[i - 1].canAccept(cell.tile);
            });
        });
    }

    private async slide(cells: Cell[][]) {
        if (this.canMove(cells)) {
            await Events.slideTiles(cells);
            this._board.cells.forEach((cell) => {
                const score = cell.mergeTiles();
                if (score !== 0) this.trigger("scoreUp", score);
            });

            this._board.randomEmptyCell().tile = new Tile(this._board);
        }

        this.bindEvents();
    }

    private static slideTiles(cells: Cell[][]) {
        return Promise.all(
            cells.flatMap((group: Cell[]) => {
                const promises = [];
                for (let i = 1; i < group.length; i++) {
                    const cell = group[i];
                    if (cell.tile === null) continue;

                    let lastValidCell;
                    for (let j = i - 1; j >= 0; j--) {
                        const moveToCell = group[j];
                        if (!moveToCell.canAccept(cell.tile)) break;
                        lastValidCell = moveToCell;
                    }

                    if (lastValidCell) {
                        promises.push(cell.tile.waitForTransition());
                        if (lastValidCell.tile) {
                            lastValidCell.tileToMerge = cell.tile;
                        } else lastValidCell.tile = cell.tile;
                        cell.tile = null;
                    }
                }

                return promises;
            })
        );
    }

    public on(event: string, callback: Function) {
        this._events[event] = callback;
    }

    private trigger(event: string, ...args: any[]) {
        if (this._events[event]) {
            const handler: Function = this._events[event];
            handler(...args);
        }
    }
}
