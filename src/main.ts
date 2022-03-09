import Board from "./components/Board";
import "./assets/styles/main.css";
import Tile from "./components/Tile";
import Events from "./event";

const scoreField = document.querySelector("[data-score]")!;
const board = new Board(document.querySelector("[data-board]"));
const events = new Events(board);

board.randomEmptyCell().tile = new Tile(board);
board.randomEmptyCell().tile = new Tile(board);

events.on("scoreUp", (score: number) => {
    scoreField.innerHTML = `${+scoreField.innerHTML + score}`;
});
