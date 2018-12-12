// Objeto del videojuego
var Tetris = {
    // Variables
    game_state: false,  // true = Juego en marcha, false = Fin del juego
    board: [],  // x = 10, y = 25; 0 -> vacío, 1 -> Lleno
    // IDEA TABLERO
    // - Guardar en cada posición un objeto vacío (en caso de que no haya pieza) o guardar el objeto de la pieza
    board_state: false,  // true = Puede instanciar pieza, false = No puede instanciar más piezas
    score: 0,
    max_score: 0,
    pieces_to_play: {
        current_piece: {},
        next_piece: {}
    },
    used_pieces: {
        "I": 0,
        "J": 0,
        "L": 0,
        "O": 0,
        "S": 0,
        "T": 0,
        "Z": 0
    },
    pieces_count: 0,
    level: 1,
    routine_time: 0,
    routine: undefined,

    // Funciones
    initialize: function () {
        this.game_state = true;
        this.board = this.initializeBoard();
        this.paintScreen();  // Pinta la pantalla para mostrar el tablero desde el principio.
        this.board_state = true;
        this.score = 0;
        this.max_score = this.loadMaxScore();
        this.pieces_to_play = {
            current_piece: {},
            next_piece: {}
        };
        this.used_pieces = {
            "I": 0,
            "J": 0,
            "L": 0,
            "O": 0,
            "S": 0,
            "T": 0,
            "Z": 0
        };
        this.pieces_count = 0;
        this.level = 0;
        this.increaseLevel();
        document.addEventListener('keydown', this.moveCurrentPiece);  // Inicializa el evento para recibir ordenes del teclado
        this.routine_time = 1000;
        this.createRoutine(true);

        // Inicializa la variable "pieces_to_play":
        this.calculateNextPiece();
        this.changeCurrentPiece();
        this.calculateNextPiece();

        console.log("::: TETRIS INICIALIZADO :::");
    },
    calculateNextPiece: function () {
        // 1.- Coger de forma aleatoria una pieza
        var index = Math.floor(Math.random() * AVAILABLE_PIECES.length);
        var data = AVAILABLE_PIECES[index];

        // 2.- Se crea una instancia de la pieza pasándole los parámetros
        this.pieces_to_play.next_piece = new Piece(data.name, data.shape, data.color);

        // 3.- Pinta la siguiente pieza por pantalla
        this.paintNextPiece();
    },
    changeCurrentPiece: function () {
        // La siguiente pieza pasa a ser la pieza actual
        this.pieces_to_play.current_piece = this.pieces_to_play.next_piece;
        this.pieces_to_play.next_piece = {};
        this.incrementUsedPieces(this.pieces_to_play.current_piece.name);
    },
    incrementUsedPieces: function (piece_name) {
        // Incrementa el uso de una pieza
        this.pieces_count++;
        this.used_pieces[piece_name]++;
        if (this.pieces_count % 10 == 0) {
            this.increaseLevel();
            this.increaseScore(20);  // Incrementa la puntuación
            this.createRoutine(false);
        }
    },
    createRoutine: function (initGame) {
        // Destruye el intervalo actual y crea otro
        this.killInterval();
        if (!initGame) this.routine_time = this.routine_time - ((this.routine_time * 10) / 100);
        this.routine = this.initializeRoutine(this.routine_time);  // Inicializa el intervalo
    },
    moveCurrentPiece: function (event) {
        // Controla el movimiento (izquierda/derecha) de la pieza actual y la rotación de la misma
        switch (event.keyCode) {
            case 37:  // izquierda
                Tetris.pieces_to_play.current_piece.leftMove();
                Tetris.paintScreen();
                break;
            case 39:  // derecha
                Tetris.pieces_to_play.current_piece.rightMove();
                Tetris.paintScreen();
                break;
            case 40:  // abajo
                // Baja la pieza actual
                if (Tetris.pieces_to_play.current_piece.downMove()) {
                    // La pieza puede bajar
                    Tetris.increaseScore(1);  // Incrementa la puntuación
                }
                else {
                    // La pieza ya no puede bajar
                    Tetris.isGameOver();  // Comprueba si la partida va o no ha finalizar
                }
                Tetris.paintScreen();
                break;
            case 65:  // A => Rotas izquierda
                Tetris.pieces_to_play.current_piece.leftRotate();
                Tetris.paintScreen();
                break;
            case 68:  // D => Rotas derecha
                Tetris.pieces_to_play.current_piece.rightRotate();
                Tetris.paintScreen();
                break;
        }
    },
    piecesFallMovement: function () {
        // Hace que la pieza actual caiga una casilla hacia abajo
        if (!Tetris.pieces_to_play.current_piece.downMove() && !this.isGameOver()) {
            this.increaseScore(10);  // Incrementa la puntuación si la partida todavía no ha acabado
        }
    },
    initializeBoard: function () {
        var result = [];
        for (var y = 0; y < ROWS; y++) {
            result.push([]);
            for (var x = 0; x < COLUMNS; x++) {
                result[y].push(0);
            }
        }
        return result;
    },
    loadMaxScore: function () {
        var value = 0;
        document.cookie.split("; ").filter((item) => {
            var itemArray = item.split("=");
            if (itemArray[0] == "max_score") {
                value = parseInt(itemArray[1]);
            }
        });

        $("#max_score").text(value);  // Muestra la puntuación máxima por pantalla
        return value;
    },
    increaseScore: function (points) {
        // Incrementa la puntuación
        this.score += points;
        this.refreshScore();
    },
    increaseLevel: function () {
        // Incrementa el nivel y lo muestra
        this.level++;
        $("#level").text(this.level);
    },
    paintScreen: function () {
        // Muestra el videojuego por pantalla
        var table = $("#tetris");
        table.empty();
        var content = "";
        for (var y = ROWS - 1; y >= 0; y--) {
            content += "<tr>";
            for (var x = 0; x < COLUMNS; x++) {
                var color = (this.board[y][x] != 0) ? this.board[y][x] : "#A9A9A9";  // Gris: #A9A9A9
                content += "<td style='background-color: " + color + "; width: 20px; height: 20px;'></td>";
            }
            content += "</tr>";
        }
        table.append(content);
    },
    paintNextPiece: function () {
        var table = $("#next_piece");
        table.empty();
        var piece = this.pieces_to_play.next_piece.getPieceShape();
        var piece_color = this.pieces_to_play.next_piece.getColor();
        var content = "";

        for (var y = 0; y < piece.length; y++) {
            content += "<tr>";
            for (var x = 0; x < piece[y].length; x++) {
                var color = (piece[y][x] != 0) ? piece_color : "#A9A9A9";  // Gris: #A9A9A9
                content += "<td style='background-color: " + color + "; width: 20px; height: 20px;'></td>";
            }
            content += "</tr>";
        }

        table.append(content);
    },
    checkForHorizontalLine: function () {
        // Comprueba si se ha completado alguna línea horizontal para borrarla
        for (var y = 0; y < ROWS; y++) {
            var checker = 0;
            for (var x = 0; x < COLUMNS; x++) {
                if (this.board[y][x] != 0) {
                    checker++;
                }
            }
            if (checker == COLUMNS) {
                // Si la línea está completa la borra
                for (var x = 0; x < COLUMNS; x++) {
                    this.board[y][x] = 0;
                }

                // Baja las piezas de arriba
                for (var y2 = y; y2 < ROWS - 1; y2++) {
                    for (var x = 0; x < COLUMNS; x++) {
                        this.board[y2][x] = this.board[y2 + 1][x];
                    }
                }
                y--;  // Resta una posición a la "y", ya que todas las piezas que habían arriba han bajado, y hay que comprobarlas
            }
        }
    },
    refreshScore: function () {
        $("#score").text(this.score);
    },
    isGameOver: function () {
        var piece_position = this.pieces_to_play.current_piece.getPosition();
        if (piece_position[0] == START_POSITION[0] && piece_position[1] == START_POSITION[1]) {
            // Si la posición actual es la misma que la inicial será fin del juego
            this.gameOver();
            return true;
        }
        else {
            // Si la partida continua:
            this.checkForHorizontalLine();  // Calcula si hay líneas horizontales
            this.changeCurrentPiece();  // Cambia a la siguiente pieza
            this.calculateNextPiece();  // Calcula la siguiente pieza
            return false;
        }
    },
    gameOver: function () {
        // Finaliza el videojuego en caso de que esté activo
        if (this.game_state) {
            this.game_state = false;
            document.removeEventListener('keydown', this.moveCurrentPiece);  // Borra el evento para recibir ordenes del teclado
            this.killInterval();
            // TODO: Guardar la máxima puntuación en una cookie
            // TODO: Mostrar mensaje por pantalla para reiniciar el videojuego
        }
    },
    initializeRoutine: function (miliseconds) {
        // Retorna el intervalo
        return setInterval((self) => {  // "self" hace referencia a la clase Tetris
            self.piecesFallMovement();
            self.paintScreen();
            console.log(self.routine_time);
        }, miliseconds, this);
    },
    killInterval: function () {
        // Si hay intervalo lo elimina
        if (this.routine != undefined) {
            clearInterval(this.routine);
            this.routine = undefined;
        }
    }
}

/*
    ::: Idea para el intervalo :::
    - Almacenar el intervalo en la variable "routine".
    - Comprobar si la pieza actual (pieces_to_play/current_piece) está en movimiento
    o no:
        · Si está en movimiento bajarla una posición (y - 1).
        · Si no está en movimiento significa que ya ha llegado abajo,
        por lo cual la rutina hará que la pieza siguiente pase a ser la
        actual, y seguidamente (de forma aleatoria) seleccionar la próxima
        pieza.
            -> Tener en cuenta que para saber si se pueden instanciar más piezas, es decir,
            si la partida todavía no ha finalizado, se utilizará la variable "board_state".
    - El intervalo también comprobará el fin de partida (cuando la nueva
    pieza no pueda instanciarse, porque su casilla ya está ocupada) utilizando
    la variable "game_state".
    - Tener en cuenta la puntuación del jugador...
    - Tener en cuenta que cada 10 piezas y el tiempo del intervalo irá disminuyendo,
    esto significa que se tendrá que destruir el intervalo actual y crear otro.
*/