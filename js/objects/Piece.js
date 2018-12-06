var Piece = function (name, shape, color) {
    this.name = name;
    this.shape = shape;
    this.color = color;
    this.position = [21, 4];  // y - x
}
Piece.prototype.leftMove = function () {
    var board = Tetris.board;  // Coge el tablero

    // 1.- Quita la pieza actual del tablero
    this.paintOnTheBoard(board, 0);

    // 2.- Mueve a la posición izquierda y comprueba si es válida
    var new_pos = [this.position[0], this.position[1] - 1];  // y - x
    var can_move = false, out_board = false;
    var x_pos = 0, y_pos = 3;
    for (var y = new_pos[0]; y < new_pos[0] + 4; y++) {
        x_pos = 0;
        for (var x = new_pos[1]; x < new_pos[1] + 4; x++) {
            if (this.shape[y_pos][x_pos] != 0) {
                if (board[y][x] != 0) {
                    // Si la posición es "undefined" o hay alguna pieza en la posición del tablero entonces no se moverá
                    out_board = true;
                }
                else if (board[y][x] == 0) {
                    // Si la posición del tablero está libre entonces la pieza se podrá mover
                    can_move = true;
                }
            }
            x_pos++;
        }
        y_pos--;
    }

    if (can_move && !out_board) {
        // Si finalmente se puede mover se le asigna la nueva posición
        this.position = new_pos;
    }

    // 3.- Pinta la pieza en el tablero
    this.paintOnTheBoard(board, this.color);

    return (can_move && !out_board);
}
Piece.prototype.rightMove = function () {
    var board = Tetris.board;  // Coge el tablero

    // 1.- Quita la pieza actual del tablero
    this.paintOnTheBoard(board, 0);

    // 2.- Mueve a la posición derecha y comprueba si es válida
    var new_pos = [this.position[0], this.position[1] + 1];  // y - x
    var can_move = false, out_board = false;
    var x_pos = 0, y_pos = 3;
    for (var y = new_pos[0]; y < new_pos[0] + 4; y++) {
        x_pos = 0;
        for (var x = new_pos[1]; x < new_pos[1] + 4; x++) {
            if (this.shape[y_pos][x_pos] != 0) {
                if (board[y][x] != 0) {
                    // Si la posición es "undefined" o hay alguna pieza en la posición del tablero entonces no se moverá
                    out_board = true;
                }
                else if (board[y][x] == 0) {
                    // Si la posición del tablero está libre entonces la pieza se podrá mover
                    can_move = true;
                }
            }
            x_pos++;
        }
        y_pos--;
    }

    if (can_move && !out_board) {
        // Si finalmente se puede mover se le asigna la nueva posición
        this.position = new_pos;
    }

    // 3.- Pinta la pieza en el tablero
    this.paintOnTheBoard(board, this.color);

    return (can_move && !out_board);
}
Piece.prototype.downMove = function () {
    var board = Tetris.board;  // Coge el tablero

    // 1.- Quita la pieza actual del tablero
    this.paintOnTheBoard(board, 0);

    // 2.- Baja a la posición y comprueba si es válida
    var new_pos = [this.position[0] - 1, this.position[1]];  // y - x
    var can_move = false, out_board = false;
    var x_pos = 0, y_pos = 3;
    for (var y = new_pos[0]; y < new_pos[0] + 4; y++) {
        x_pos = 0;
        for (var x = new_pos[1]; x < new_pos[1] + 4; x++) {
            if (this.shape[y_pos][x_pos] != 0) {
                if (board[y] == undefined) {
                    // Si la posición es "undefined" o hay alguna pieza en la posición del tablero entonces no se moverá
                    out_board = true;
                }
                else if (board[y][x] == 0) {
                    // Si la posición del tablero está libre entonces la pieza se podrá mover
                    can_move = true;
                }
                else if (board[y][x] != 0) {
                    // Si la posición del tablero está ocupada entonces la pieza ya no se podrá mover más
                    out_board = true;
                }
            }
            x_pos++;
        }
        y_pos--;
    }

    if (can_move && !out_board) {
        // Si finalmente se puede mover se le asigna la nueva posición
        this.position = new_pos;
    }

    // 3.- Pinta la pieza en el tablero
    this.paintOnTheBoard(board, this.color);

    return (can_move && !out_board);
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
    var can_move = false, out_board = false;
    var x_pos = 0, y_pos = 3;
    for (var y = new_pos[0]; y < new_pos[0] + 4; y++) {
        x_pos = 0;
        for (var x = new_pos[1]; x < new_pos[1] + 4; x++) {
            if (new_shape[y_pos][x_pos] != 0) {
                if (board[y] == undefined) {
                    // Si la posición es "undefined" o hay alguna pieza en la posición del tablero entonces no se moverá
                    out_board = true;
                }
                else if (board[y][x] == 0) {
                    // Si la posición del tablero está libre entonces la pieza se podrá mover
                    can_move = true;
                }
                else if (board[y][x] != 0) {
                    // Si la posición del tablero está ocupada entonces la pieza ya no se podrá mover más
                    out_board = true;
                }
            }
            x_pos++;
        }
        y_pos--;
    }

    if (can_move && !out_board) {
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
    var can_move = false, out_board = false;
    var x_pos = 0, y_pos = 3;
    for (var y = new_pos[0]; y < new_pos[0] + 4; y++) {
        x_pos = 0;
        for (var x = new_pos[1]; x < new_pos[1] + 4; x++) {
            if (new_shape[y_pos][x_pos] != 0) {
                if (board[y] == undefined) {
                    // Si la posición es "undefined" o hay alguna pieza en la posición del tablero entonces no se moverá
                    out_board = true;
                }
                else if (board[y][x] == 0) {
                    // Si la posición del tablero está libre entonces la pieza se podrá mover
                    can_move = true;
                }
                else if (board[y][x] != 0) {
                    // Si la posición del tablero está ocupada entonces la pieza ya no se podrá mover más
                    out_board = true;
                }
            }
            x_pos++;
        }
        y_pos--;
    }

    if (can_move && !out_board) {
        // Si la posición es válida podrá rotar la pieza
        this.shape = new_shape;
    }

    // 4.- Pinta la pieza en el tablero
    this.paintOnTheBoard(Tetris.board, this.color);
}
Piece.prototype.getPieceShape = function () {
    return this.shape;
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