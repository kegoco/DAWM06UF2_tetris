var Piece = function (name, shape, color) {
    this.name = name;
    this.shape = shape;
    this.color = color;
    this.position = [21, 5];  // y - x
}
Piece.prototype.leftMove = function () {
    
}
Piece.prototype.rightMove = function () {
    
}
Piece.prototype.downMove = function () {
    var board = Tetris.board;

    // 1.- Quita la pieza actual del tablero
    var x_pos = 0, y_pos = 0;
    for (var y = this.position[0]; y < this.position[0] + 4; y++) {
        x_pos = 0;
        for (var x = this.position[1]; x < this.position[1] + 4; x++) {
            if (this.shape[y_pos][x_pos] != 0) {
                board[y][x] = 0;
            }
            x_pos++;
        }
        y_pos++;
    }

    // 2.- Baja a la posición y comprueba si es válida
    var new_pos = [this.position[0] - 1, this.position[1]];  // y - x
    var can_move = false;
    var x_pos = 0, y_pos = 0;
    for (var y = new_pos[0]; y < new_pos[0] + 4; y++) {
        x_pos = 0;
        for (var x = new_pos[1]; x < new_pos[1] + 4; x++) {
            if (this.shape[y_pos][x_pos] != 0) {
                if (board[y - y_pos] == undefined || board[y][x] != 0) {
                    // Si la posición es "undefined" o hay alguna pieza en la posición del tablero entonces no se moverá
                    can_move = false;
                    break;
                }

                if (board[y][x] == 0) {
                    // Si la posición del tablero está libre entonces la pieza se podrá mover
                    can_move = true;
                }
            }
            x_pos++;
        }
        if (board[y - y_pos] == undefined || board[y][x] != 0) break;
        y_pos++;
    }

    if (can_move) {
        // Si finalmente se puede mover se le asigna la nueva posición
        this.position = new_pos;
    }

    // 3.- Pinta la pieza en el tablero
    var x_pos = 0, y_pos = 0;
    for (var y = this.position[0]; y < this.position[0] + 4; y++) {
        x_pos = 0;
        for (var x = this.position[1]; x < this.position[1] + 4; x++) {
            if (this.shape[y_pos][x_pos] != 0) {
                board[y][x] = this.color;
            }
            x_pos++;
        }
        y_pos++;
    }

    return can_move;
}
Piece.prototype.leftRotate = function () {
    
}
Piece.prototype.rightRotate = function () {
    
}
Piece.prototype.getPieceShape = function () {
    return this.shape;
}