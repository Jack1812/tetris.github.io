class Grid{
    constructor(canvas,rows, cols, celleSize, space){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d'); 
        this.rows = rows;
        this.cols = cols;
        this.cellSize = celleSize;
        this.space = space;
        this.matris = [];

    }
    restarMatris(){ 
        for(let r = 0; r < this.rows; r++){
            this.matris[r ] = [];
            for(let c = 0; c < this.cols; c++){
                this.matris[r][c] = 0;
            }
        }
    }   
    drawSquare(x, y, color,borderColor){
        const bordeSice = 1;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, side, side);

        this.ctx.strokeStyle = borderColor; 
        this.ctx.lineWidth = bordeSice;
        this.ctx.strokeRect(x+borderSice/2, y+bordeSice/2, side - bordeSice, side - bordeSice); 
    }    
    getCoordinates(col, rows){
        return{
            x: col * this.cellSize + this.space,
            y: rows * this.cellSize + this.space
        }
    }
    draw(){
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                const {x, y} = this.getCoordinates(c, r);
                if(this.matris[r][c] === 0){
                    this.drawSquare(x, y, 'white', 'black');
                }else{
                    this.drawSquare(x, y, 'black', 'white');
                }
            }
        }

    }
}