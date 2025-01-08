import { TetrominosBag } from "./tetromino.js";
import { BoardTetris } from "./boardTetris.js";

export class Game{
    constructor(canvas, rows, cols, cellSize, space){
        this.board = new BoardTetris(canvas, rows, cols, cellSize, space);
        this.bag = new TetrominosBag(canvas, cellSize);
        this.currentTetromino = this.bag.nextTetromino();


    }
    blockedTetromino(){
        const tetrominoPosition = this.currentTetromino.currentTetromino();
        for(let i = 0; i<tetrominoPosition.length; i++){
            if(!this.board.isEmptyCell(tetrominoPosition[i].row, tetrominoPosition[i].colums)){
                return true;

            }
        }
        return false;
    }
    moveTetrominoLeft(){
        this.currentTetromino.move(0,-1);
        if(this.blockedTetromino()){
            this.currentTetromino.move(0,1);
        }
    }
    moveTetrominoRight(){
        this.currentTetromino.move(0,1);
        if(this.blockedTetromino()){
            this.currentTetromino.move(0,-1);
        }
    }
    moveTetrominoDown(){
        this.currentTetromino.move(1,0);
        if(this.blockedTetromino()){
            this.currentTetromino.move(-1,0);
    
        }
    }
    rotateTetrominoCW(){
        this.currentTetromino.rotation++;
        if(this.currentTetromino.rotation > this.currentTetromino.shapes.length-1){
            this.currentTetromino.rotation = 0;
        }
        if(this.blockedTetromino()){
            this.rotationTetrominoCCW();
        }
    }
    rotateTetrominoCCW(){
        this.currentTetromino.rotation--;
        if(this.currentTetromino.rotation < 0){
            this.currentTetromino.rotation = this.currentTetromino.shapes.length-1;
        }
        if(this.blockedTetromino()){
            this.rotateTetrominoCW();
        }
    }
}