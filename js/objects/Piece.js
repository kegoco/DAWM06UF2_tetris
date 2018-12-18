var Piece = function (name, shape, color) {
    this.name = name;
    this.shape = shape;
    this.color = color;
    this.position = START_POSITION;  // y - x
}

Piece.prototype.leftMove = function () {
    var board = Tetris.board;  // Coge el tablero

    // 1.- Quita la pieza actual del tablero
    this.paintOnTheBoard(board, 0);

    // 2.- Mueve a la posición izquierda y comprueba si es válida
    var new_pos = [this.position[0], this.position[1] - 1];  // y - x
    var can_move = this.checkPosition(board, new_pos, this.shape);

    if (can_move) {
        // Si finalmente se puede mover se le asigna la nueva posición
        this.position = new_pos;
    }

    // 3.- Pinta la pieza en el tablero
    this.paintOnTheBoard(board, this.color);

    return can_move;
}

Piece.prototype.rightMove = function () {
    var board = Tetris.board;  // Coge el tablero

    // 1.- Quita la pieza actual del tablero
    this.paintOnTheBoard(board, 0);

    // 2.- Mueve a la posición derecha y comprueba si es válida
    var new_pos = [this.position[0], this.position[1] + 1];  // y - x
    var can_move = this.checkPosition(board, new_pos, this.shape);

    if (can_move) {
        // Si finalmente se puede mover se le asigna la nueva posición
        this.position = new_pos;
    }

    // 3.- Pinta la pieza en el tablero
    this.paintOnTheBoard(board, this.color);

    return can_move;
}

Piece.prototype.downMove = function () {
    var board = Tetris.board;  // Coge el tablero

    // 1.- Quita la pieza actual del tablero
    this.paintOnTheBoard(board, 0);

    // 2.- Baja a la posición y comprueba si es válida
    var new_pos = [this.position[0] - 1, this.position[1]];  // y - x
    var can_move = this.checkPosition(board, new_pos, this.shape);

    if (can_move) {
        // Si finalmente se puede mover se le asigna la nueva posición
        this.position = new_pos;
    }

    // 3.- Pinta la pieza en el tablero
    this.paintOnTheBoard(board, this.color);

    return can_move;
}

Piece.prototype.leftRotate = function () {
    var board = Tetris.board;  // Coge el tablero

    // 1.- Quita la pieza actual del tablero
    this.paintOnTheBoard(board, 0);

    // 2.- Gira la pieza
    var new_shape = [];
    for (var y = 0; y < this.shape.length; y++) {
        new_shape[y] = [];
        for (var x = 0; x < this.shape[y].length; x++) {
            new_shape[y][x] = this.shape[x][this.shape.length - 1 - y];
        }
    }

    // 3.- Comprueba si es una posición válida con la nueva forma
    var new_pos = [this.position[0], this.position[1]];  // y - x
    var can_move = this.checkPosition(board, new_pos, new_shape);

    if (can_move) {
        // Si la posición es válida podrá rotar la pieza
        this.shape = new_shape;
    }

    // 4.- Pinta la pieza en el tablero
    this.paintOnTheBoard(Tetris.board, this.color);
}

Piece.prototype.rightRotate = function () {
    var board = Tetris.board;  // Coge el tablero

    // 1.- Quita la pieza actual del tablero
    this.paintOnTheBoard(board, 0);

    // 2.- Gira la pieza
    var new_shape = [];
    for (var y = 0; y < this.shape.length; y++) {
        new_shape[y] = [];
        for (var x = 0; x < this.shape[y].length; x++) {
            new_shape[y][x] = this.shape[this.shape[y].length - 1 - x][y];
        }
    }

    // 3.- Comprueba si es una posición válida con la nueva forma
    var new_pos = [this.position[0], this.position[1]];  // y - x
    var can_move = this.checkPosition(board, new_pos, new_shape);

    if (can_move) {
        // Si la posición es válida podrá rotar la pieza
        this.shape = new_shape;
    }

    // 4.- Pinta la pieza en el tablero
    this.paintOnTheBoard(Tetris.board, this.color);
}

Piece.prototype.checkPosition = function (board, position, shape) {
    // Comprueba si la posición es válida
    var can_move = true;
    var x_pos = 0, y_pos = 3;

    for (var y = position[0]; y < position[0] + 4 && can_move; y++) {
        x_pos = 0;
        for (var x = position[1]; x < position[1] + 4 && can_move; x++) {
            if (shape[y_pos][x_pos] != 0) {
                if (board[y] == undefined) {
                    // Si la posición es "undefined" o hay alguna pieza en la posición del tablero entonces no se moverá
                    can_move = false;
                }
                else if (board[y][x] == 0) {
                    // Si la posición del tablero está libre entonces la pieza se podrá mover
                    can_move = true;
                }
                else if (board[y][x] != 0) {
                    // Si la posición del tablero está ocupada entonces la pieza ya no se podrá mover más
                    can_move = false;
                }
            }
            x_pos++;
        }
        y_pos--;
    }

    return can_move;
}

Piece.prototype.getPieceShape = function () {
    // Retorna la forma de la pieza
    return this.shape;
}

Piece.prototype.getColor = function () {
    // Retorna el color de la pieza
    return this.color;
}

Piece.prototype.getPosition = function () {
    // Retorna la posición de la pieza
    return this.position;
}

Piece.prototype.paintOnTheBoard = function (board, value) {
    // Pinta en el tablero el color que se le pase por parámetro
    var x_pos = 0, y_pos = 3;
    for (var y = this.position[0]; y < this.position[0] + 4; y++) {
        x_pos = 0;
        for (var x = this.position[1]; x < this.position[1] + 4; x++) {
            if (this.shape[y_pos][x_pos] != 0) {
                board[y][x] = value;
            }
            x_pos++;
        }
        y_pos--;
    }
}