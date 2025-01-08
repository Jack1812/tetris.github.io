import { Tetromino } from './tetromino.js';

export class Grid {
    constructor(canvas, rows, cols, cellSize, space) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize; // corrected typo
        this.space = space;
        this.matrix = []; // corrected typo
        this.resetMatrix(); // corrected typo
        this.canvas.width = this.cols * this.cellSize + (this.space*this.cols);
        this.canvas.height = this.rows * this.cellSize + (this.space*this.rows);    

        this.block = new Tetromino(this.canvas, this.cellSize, [], {row: 0, col: 0}, 0, 'black'); // corrected typo
    }

    resetMatrix() { // corrected typo
        for (let r = 0; r < this.rows; r++) {
            this.matrix[r] = []; // corrected typo
            for (let c = 0; c < this.cols; c++) {
                this.matrix[r][c] = 0;
            }
        }
    }

    drawSquare(x, y, side, color, borderColor) {
        const borderSize = side / 10; // corrected typo

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, side, side);

        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = borderSize; // corrected typo
        this.ctx.strokeRect(x + borderSize / 2, y + borderSize / 2, side - borderSize, side - borderSize); // corrected typo
    }

    getCoordinates(col, row) {
        return {
            x: col * this.cellSize + this.space,
            y: row * this.cellSize + this.space
        };
    }

    draw() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const position = this.getCoordinates(c, r);
                if (this.matrix[r][c] !== 0) {
                    this.drawSquare(position.x, position.y, this.cellSize, 'gray', 'black');
                } else {
                    this.drawSquare(position.x, position.y, this.cellSize, 'white', 'black');
                }
            }
        }
        this.printMatrix();
    }

    printMatrix() {
        let text = "";
        this.matrix.forEach((row) => {
            text += row.join(" ") + "\n";
        });
        console.log(text);
    }
}