import Events from "./event";
import Board from "./components/Board";
import Tile from "./components/Tile";
import "./assets/styles/main.css";

const scoreField = document.querySelector("[data-score]")!;
const bestField = document.querySelector("[data-best]")!;
const gameOver = document.querySelector('[data-message]')!;
const restartBtn = gameOver.querySelector("button")!;
const board = new Board(document.querySelector("[data-board]"));
const events = new Events(board);

board.randomEmptyCell().tile = new Tile(board);
board.randomEmptyCell().tile = new Tile(board);

restartBtn.addEventListener("click", () => {
    gameOver.classList.remove("visible");
    board.cells.forEach(cell => cell.removeTiles());
    board.randomEmptyCell().tile = new Tile(board);
    board.randomEmptyCell().tile = new Tile(board);
    scoreField.innerHTML = `${0}`;
});

events.on("scoreUp", (score: number) => {
    scoreField.innerHTML = `${+scoreField.innerHTML + score}`;
});

events.on("gameEnded", () => {
    localStorage.setItem("best-score", scoreField.innerHTML);
    bestField.innerHTML = scoreField.innerHTML;
    gameOver.classList.add("visible");
    events.bindEvents();
});

bestField.innerHTML = localStorage.getItem("best-score") ?? "0";