import Tile from "./Tile";

export default class Cell {
    private _x: number;
    private _y: number;
    private _element: HTMLElement;
    private _tile: Tile | null = null;
    private _tileToMerge: Tile | null = null;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;

        const element = document.createElement("li");
        element.setAttribute("data-cell", "");
        this._element = element;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get element(): HTMLElement {
        return this._element;
    }

    public get tile(): Tile | null {
        return this._tile;
    }

    public set tile(value: Tile | null) {
        this._tile = value;
        if (this.tile === null) return;

        this.tile.x = this.x;
        this.tile.y = this.y;
    }

    public get tileToMerge(): Tile | null {
        return this._tileToMerge;
    }

    public set tileToMerge(value: Tile | null) {
        this._tileToMerge = value;
        if (this.tileToMerge === null) return;

        this.tileToMerge.x = this.x;
        this.tileToMerge.y = this.y;
    }

    public canAccept(tile: Tile): boolean {
        return (
            this.tile === null ||
            (this.tileToMerge === null && this.tile.value === tile.value)
        );
    }

    public mergeTiles(): number {
        if (this.tile == null || this.tileToMerge == null) return 0;
        this.tile.value += this.tileToMerge.value;
        this.tileToMerge.remove();
        this.tileToMerge = null;
        return this.tile.value;
    }

    public removeTile() {
        this.tile?.remove();
        this.tile = null;
    }
}
