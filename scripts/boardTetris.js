import { Grid } from '/scripts/grid.js';

export class BoardTetris extends Grid{
    constructor(canvas, rows, cols, cellSize, space){
        super(canvas, rows, cols, cellSize, space);
    }
    isInside(row, col){
        return row>= 0 && row<this.rows && col>=0 && col<this.cols;
    }
    isEmpty(row, col){
        return this.isInside(row, col)  && this.matrix[row][col] === 0;
    }
    isRowFull(row){
        return this.matrix[row].every(element => element !== 0);
    }
    isRowEmpty(row){
        return this.matrix[row].every(element => element === 0);
    }
    clearRow(row){
        this.matrix[row].fill(0);
    }
    moveRowDown(row, numRows){
        this.matriz[row + numRows] = this.matrix[row];
        this.clearRow(row);
    }
    clearFullRows(){
        let cont = 0;

        for(let row = this.row - 1; row >= 0; row--){
            if(this.isRowFull(row)){
                this.clearRow(row);
                cont++;
            } else if (cont > 0){
                this.moveRowDown(row, cont);
            }
        }

        return cont;
    }  
    gameOver(){
        return !(this.isRowEmpty(0));
    }  
}