
const canvasTetris = document.getElementById("canvas-tetris");
const rows = 20;
const cols = 10;
const cellSize = 26;
const space = 2;
const boardTetris = new Grid(canvasTetris, rows, cols, cellSize, space);


function update() {
 
    requestAnimationFrame(update);
}

update();