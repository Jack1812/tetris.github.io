import {  TetrominosBag } from "./tetromino.js";
import { BoardTetris } from "./boardTetris.js";

export class Game {
    constructor(canvas, rows, cols, cellSize, space) {
        this.boardTetris = new BoardTetris(canvas, rows, cols, cellSize, space);
        this.tetrominosBag = new TetrominosBag(canvas,cellSize);
        this.currentTetromino = this.tetrominosBag.nextTetromino();
        this.keyboar();
        this.keys = {up:false,down:false};
        
        this.lastTime = 0;
        this.lastTime2 = 0;
    }
    update() {
        let currentTime = Date.now();
        let deltaTime = currentTime - this.lastTime;
        let deltaTime2 = currentTime - this.lastTime2;
        if (deltaTime >= 1000) {
            this.autoMoveTetrominoDown();
            this.lastTime = currentTime;
        }
        if(deltaTime2 >= 50) {
            this.boardTetris.draw();
            this.currentTetromino.draw(this.boardTetris);
            if (this.keys.down) {
                this.moveTetrominoDown();
            }
            this.lastTime2 = currentTime;

        }    
        this.boardTetris.draw();
        this.currentTetromino.draw(this.boardTetris);
    }
    autoMoveTetrominoDown() {
        this.currentTetromino.move(1,0);
        if (this.blockedTetromino()) {
            this.currentTetromino.move(-1,0);
            this.placeTetromino();
        }
    }

    blockedTetromino() {
        const tetrominoPosition = this.currentTetromino.currentPositions();
        for (let i = 0; i < tetrominoPosition.length; i++) {
            if (!this.boardTetris.isEmpty(tetrominoPosition[i].row, tetrominoPosition[i].column)) {
                return true;
            }
        }
        return false;
    }

    moveTetrominoLeft() {
        this.currentTetromino.move(0,-1);
        if (this.blockedTetromino()) {
            this.currentTetromino.move(0,1);
        }
    }

    moveTetrominoRight() {
        this.currentTetromino.move(0, 1);
        if (this.blockedTetromino()) {
            this.currentTetromino.move(0, -1);
        }
    }

    moveTetrominoDown() {
        this.currentTetromino.move(1, 0);
        if (this.blockedTetromino()) {
            this.currentTetromino.move(-1, 0);
    
        }
    }

    rotationTetrominoCW() {
        this.currentTetromino.rotation++;
        if (this.currentTetromino.rotation > this.currentTetromino.shapes.length-1) {
            this.currentTetromino.rotation = 0;
        }
        if (this.blockedTetromino()) {
            this.rotationTetrominoCCW();
            }
            
        }
    rotationTetrominoCCW() {
        this.currentTetromino.rotation--;
        if (this.currentTetromino.rotation<0) {
            this.currentTetromino.rotation = this.currentTetromino.shapes.length - 1;
        }
        if (this.blockedTetromino()) {
            this.rotationTetrominoCW();
            }
            
     }   
     placeTetromino() {
        const tetrominoPositions = this.currentTetromino.currentPositions();
        for (let i = 0; i < tetrominoPositions.length; i++) {
            this.boardTetris.matriz
                [tetrominoPositions[i].row]
                [tetrominoPositions[i].column] = this.currentTetromino.id;
        }
        
        this.boardTetris.clearFullRows();
        
        if (this.boardTetris.gameOver()) {
            return true;
        }else {
            this.currentTetromino = this.tetrominosBag.nextTetromino();
        }
     }    
     keyboar() {
        window.addEventListener("keydown",(evt)=>{
            if(evt.key === "ArrowLeft") {
                this.moveTetrominoLeft();
            }
            if(evt.key === "ArrowRight") {
                this.moveTetrominoRight();
            }
            if(evt.key === "ArrowUp" && !this.keys.up) {
                this.rotationTetrominoCW();
                this.keys.up = true;
            }
            if(evt.key === 'ArrowDown') {
                this.keys.down = true;
            }
        });
        window.addEventListener("keyup", (evt) => {
            if(evt.key === "ArrowUp") {
                this.keys.up = false;
            }
            if(evt.key === "ArrowDown") {
                this.keys.down = false;
            }
        });     
     }
}