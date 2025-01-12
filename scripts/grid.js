import { Tetromino } from './tetromino.js';

export class Grid {
    constructor(canvas, rows, cols, cellSize, space) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize; // corrected typo
        this.space = space;
        this.matriz = []; // corrected typo
        this.restartMatriz(); // corrected typo
        this.canvas.width = this.cols * this.cellSize + (this.space*this.cols);
        this.canvas.height = this.rows * this.cellSize + (this.space*this.rows);    

        this.block = new Tetromino(this.canvas, this.cellSize, [], {row: 0, col: 0}, 0, 'black'); // corrected typo
    }

    restartMatriz() { // corrected typo
        for (let r = 0; r < this.rows; r++) {
            this.matriz[r] = []; // corrected typo
            for (let c = 0; c < this.cols; c++) {
                this.matriz[r][c] = 0;
            }
        }
    }

    drawSquare(x, y, side, color, borderColor,border) {
        const borderSize = side / border; // corrected typo

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, side, side);

        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = borderSize; // corrected typo
        this.ctx.strokeRect(x + borderSize / 2, y + borderSize / 2, side - borderSize, side - borderSize); // corrected typo
    }

    getCoordinates(col, row) {
        return {
            x: col * this.cellSize + this.space,
            y: row * this.cellSize + this.space,
        };
    }

    draw() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const position = this.getCoordinates(c, r);
                if (this.matriz[r][c] !== 0) {
                    this.block.drawBlock(position.x, position.y, this.matriz[r][c]);
                } else {
                    this.drawSquare(position.x, position.y, this.cellSize, "#000", "#303030",10);
                }
            }
        }
        this.printmatriz();
    }

    draw2() {
        this.drawBackground();
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const position = this.getCoordinates(c, r);
                if (this.matriz[r][c] !== 0) {
                    if(this.matriz[r][c] === 2){
                        this.block.drawBlock(position.x + this.cellSize, position.y, this.matriz[r][c]);
                    }
                    else if(this.matriz[r][c] === 3 ) {
                        this.block.drawBlock(position.x, position.y, this.matriz[r][c]);
                    }
                    else {
                        this.block.drawBlock(position.x + this.cellSize/2,position.y, this.matriz[r][c]);
                    }  
                }
            }
        }
    }    
    drawBackground() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

    }

    printmatriz() {
        let text = "";
        this.matriz.forEach((row) => {
            text += row.join(" ") + "\n";
        });
        console.log(text);
    }
}