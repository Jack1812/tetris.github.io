class Position {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}

class Tetromino {
    constructor(canvas, cellSize, shapes, initPosition, id, color) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = cellSize;
        this.shapes = shapes;
        this.rotation = 0;
        this.initPosition = initPosition;
        this.position = new Position(this.initPosition.row, this.initPosition.column);
        this.id = id;
        this.color = color;
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
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            2: {
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            3: {
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            4: {
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            5: {
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            6: {
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            7: {
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
            },
            8: {
                rightTriangle: 'red',
                leftTriangle: 'blue',
                square: 'yellow',
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

    currentPosition() {
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
            [new Position(0, 1), new Position(0, 0), new Position(0, 2), new Position(1, 1)],
            [new Position(1, 1), new Position(0, 1), new Position(2, 1), new Position(1, 0)],
            [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(0, 1)],
            [new Position(0, 1), new Position(1, 1), new Position(2, 1), new Position(1, 2)]
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
            [new Position(0, 0), new Position(1, 1), new Position(1, 2), new Position(2, 1)],
            [new Position(1, 1), new Position(1, 2), new Position(2, 0), new Position(2, 1)],
            [new Position(0, 1), new Position(1, 0), new Position(1, 1), new Position(2, 0)],
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

export { Position, Tetromino, TetrominoTypes };