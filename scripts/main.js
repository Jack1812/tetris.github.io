import { Tetromino, TetrominoTypes } from './tetromino.js';
import { Grid } from './grid.js';

const canvasTetris = document.getElementById("canvas-tetris");
const rows = 20;
const cols = 10;
const cellSize = 26;
const space = 2;
const boardTetris = new Grid(canvasTetris, rows, cols, cellSize, space);

const tetrominoType = TetrominoTypes.T;
const tetromino = new Tetromino(canvasTetris, cellSize, tetrominoType.shapes, tetrominoType.initPosition, tetrominoType.id, 'red');

function update() {
    boardTetris.draw();
    tetromino.draw(boardTetris);
    requestAnimationFrame(update);
}

update();