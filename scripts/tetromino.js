class Position {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}

class Tetromino {
    constructor(canvas, cellSize, shapes = [], initPosition = new Position, id=1) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = cellSize;
        this.shapes = shapes;
        this.rotation = 0;
        this.initPosition = initPosition;
        this.position = new Position(this.initPosition.row, this.initPosition.column);
        this.id = id;
        
    }

    drawSquare(x, y, size, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);
    }

    drawTriangle(x1, y1, x2, y2, x3, y3, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    getColorPalette(id) {
        const palette = {
            1: {
                rightTriangle: 'green',
                leftTriangle: 'purple',
                square: 'orange',
            },
            2: {
                rightTriangle: 'blue',
                leftTriangle: 'yellow',
                square: 'red',
            },
            3: {
                rightTriangle: 'purple',
                leftTriangle: 'green',
                square: 'blue',
            },
            4: {
                rightTriangle: 'orange',
                leftTriangle: 'red',
                square: 'purple',
            },
            5: {
                rightTriangle: 'yellow',
                leftTriangle: 'blue',
                square: 'green',
            },
            6: {
                rightTriangle: 'red',
                leftTriangle: 'orange',
                square: 'yellow',
            },
            7: {
                rightTriangle: 'blue',
                leftTriangle: 'purple',
                square: 'red',
            },
            8: {
                rightTriangle: 'green',
                leftTriangle: 'yellow',
                square: 'orange',
            },
        };
        return palette[id] || palette[1];
    }

    drawBlock(x, y, id) {
        const margin = this.cellSize / 8;
        const color = this.getColorPalette(id);

        this.drawTriangle(x, y, x + this.cellSize, y, x, y + this.cellSize, color.leftTriangle);
        this.drawTriangle(x + this.cellSize, y, x + this.cellSize, y + this.cellSize, x, y + this.cellSize, color.rightTriangle);
        this.drawSquare(x + margin, y + margin, this.cellSize - margin * 2, color.square);
    }

    currentShape() {
        return this.shapes[this.rotation];
    }

    draw(grid) {
        const shape = this.currentShape();
        for (let i = 0; i < shape.length; i++) {
            const position = grid.getCoordinates(
                this.position.column + shape[i].column,
                this.position.row + shape[i].row
            );
            this.drawBlock(position.x, position.y, this.id);
        }
    }

    currentPositions() {
        const position = [];
        const shape = this.currentShape();
        for (let i = 0; i < shape.length; i++) {
            position.push(new Position(
                this.position.row + shape[i].row,
                this.position.column + shape[i].column
            ));
        }
        return position;
    }

    move(row, column) {
        this.position.row += row;
        this.position.column += column;
    }

    rotate() {
        this.rotation = (this.rotation + 1) % this.shapes.length;
    }

    reset() {
        this.rotation = 0;
        this.position = new Position(this.initPosition.row, this.initPosition.column);
    }
}

const TetrominoTypes = {
    T: {
        id: 1,
        initPosition: new Position(0, 3),
        shapes: [
            [new Position(0, 1), new Position(1, 0), new Position(1, 1), new Position(1, 2)],
            [new Position(0, 1), new Position(1, 1), new Position(1, 2), new Position(2, 1)],
            [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(2, 1)],
            [new Position(0, 1), new Position(1, 0), new Position(1, 1), new Position(2, 1)]
        ]
    },
    O: {
        id: 2,
        initPosition: new Position(0, 4),
        shapes: [
            [new Position(0, 0), new Position(0, 1), new Position(1, 0), new Position(1, 1)],
        ]
    },
    I: {
        id: 3,
        initPosition: new Position(-1, 3),
        shapes: [
            [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(1, 3)],
            [new Position(0, 2), new Position(1, 2), new Position(2, 2), new Position(3, 2)],
            [new Position(2, 0), new Position(2, 1), new Position(2, 2), new Position(2, 3)],
            [new Position(0, 1), new Position(1, 1), new Position(2, 1), new Position(3, 1)],
        ]
    },
    S: {
        id: 4,
        initPosition: new Position(0, 3),
        shapes: [
            [new Position(0, 1), new Position(0, 2), new Position(1, 0), new Position(1, 1)],
            [new Position(0, 1), new Position(1, 1), new Position(1, 2), new Position(2, 2)],
            [new Position(1, 1), new Position(1, 2), new Position(2, 0), new Position(2, 1)],
            [new Position(0, 0), new Position(1, 0), new Position(1, 1), new Position(2, 1)],
        ]
    },
    Z: {
        id: 5,
        initPosition: new Position(0, 3),
        shapes: [
            [new Position(0, 0), new Position(0, 1), new Position(1, 1), new Position(1, 2)],
            [new Position(0, 2), new Position(1, 1), new Position(1, 2), new Position(2, 1)],
            [new Position(1, 0), new Position(1, 1), new Position(2, 1), new Position(2, 2)],
            [new Position(0, 1), new Position(1, 0), new Position(1, 1), new Position(2, 0)],
        ]
    },
    J: {
        id: 6,
        initPosition: new Position(0, 3),
        shapes: [
            [new Position(0, 0), new Position(1, 0), new Position(1, 1), new Position(1, 2)],
            [new Position(0, 1), new Position(0, 2), new Position(1, 1), new Position(2, 1)],
            [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(2, 2)],
            [new Position(0, 1), new Position(1, 1), new Position(2, 0), new Position(2, 1)],
        ]
    },
    L: {
        id: 7,
        initPosition: new Position(0, 3),
        shapes: [
            [new Position(0, 2), new Position(1, 0), new Position(1, 1), new Position(1, 2)],
            [new Position(0, 1), new Position(1, 1), new Position(2, 1), new Position(2, 2)],
            [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(2, 0)],
            [new Position(0, 0), new Position(0, 1), new Position(1, 1), new Position(2, 1)],
        ]
    }
};

class TetrominosBag {
    constructor(canvas,celleSize) {
        this.canvas = canvas;
        this.cellSize = celleSize;
        this.bag = [];
    }
    fillBag() {
        const tetrominosTypes = [
            
            TetrominoTypes.T,
            TetrominoTypes.O,
            TetrominoTypes.I,
            TetrominoTypes.S,
            TetrominoTypes.Z,
            TetrominoTypes.J,
            TetrominoTypes.L,

        ]
        this.bag.length=0;
        tetrominosTypes.forEach((type) => {
            this.bag.push(new Tetromino(
                this.canvas, this.cellSize, type.shapes, type.initPosition, type.id, 'red'
            ));
        });
        for(let i= this.bag.length-1; i>0; i--){
            let j = Math.floor(Math.random() * (i+1));
            [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
            }
        }
        nextTetromino(){
            if (this.bag.length === 0){
                this.fillBag();
            }
            return this.bag.pop();
        }    
}

export { Position, Tetromino, TetrominoTypes, TetrominosBag}