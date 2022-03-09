import Board from "./Board";

export default class Tile {
    private _element: HTMLElement;
    private _value: number;
    private _x: number;
    private _y: number;

    constructor(board: Board, value: number = Math.random() > 0.8 ? 4 : 2) {
        this._element = document.createElement("li");
        this._element.setAttribute("data-tile", "");
        board.element.append(this._element);
        this.value = value;
    }

    public get value(): number {
        return this._value;
    }

    public get element(): HTMLElement {
        return this._element;
    }

    public set value(value) {
        this._value = value;
        this.element.textContent = `${value}`;
        this.element.setAttribute("data-value", `${value}`);
    }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
        this.element.style.setProperty("--x", `${value}`);
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
        this.element.style.setProperty("--y", `${value}`);
    }

    public waitForTransition(animation: boolean = false) {
        return new Promise((resolve) => {
            this.element.addEventListener(
                animation ? "animationend" : "transitionend",
                resolve,
                { once: true }
            );
        });
    }

    public remove() {
        this.element.remove();
    }
}
