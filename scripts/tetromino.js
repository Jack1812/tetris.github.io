class Position{
    constructor(row,column){
        this.row = row;
        this.column = column;
    }
}
class Tetromino{
    constructor(canvas,cellSize,shape,initPosition,id,color){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = cellSize;
        this.shape = shape;
        this.rote = 0;  
        this.iniPosition = initPosition;
        this.position = new Position(this.initPosition.row, this.initPosition.column);
        this.id = id;
        this.color = color;

    }
    drawSquare (x, y, size,color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);
    }
    drawTriangle (x1,y1,x2,y2,x3,y3,color){
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.lineTo(x3,y3);
        this.ctx.closePath();
        this.ctx.fillStyle=color;
        this.ctx.fill();
    }
    getColerPalette(id){
        const palette = {
            1:{
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            2:{
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            3:{
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            4:{
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            5:{
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            6:{
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            7:{
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            8:{
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
        }
        return palette[id] || palette[1]

    }
    drawBlock(x,y,id){
        const margin = this.cellSize/8;
        const color = this.getColerPalette(id);

        this.drawTriangle(x,y,x+this.cellSize,y,x,y+this.cellSize,leftTriangle);
        this.drawTriangle(x+this.cellSize,y,x+this.cellSize,y+this.cellSize,x,y+this.palette,rightTriangle);  
        this.drawSquare(x+margin,y+margin,this.cellSize-margin*2,color.square); 
    }
    curr
}

