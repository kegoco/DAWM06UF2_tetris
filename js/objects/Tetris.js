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
    },
    changeCurrentPiece: function () {
        // La siguiente pieza pasa a ser la pieza actual
        this.pieces_to_play.current_piece = this.pieces_to_play.next_piece;
        this.next_piece = {};
        this.incrementUsedPieces(this.pieces_to_play.current_piece.name);  // TODO: "name" contandrá el nombre de la pieza
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
                    Tetris.increaseScore(1);  // Incrementa la puntuación
                }
                else {
                    Tetris.changeCurrentPiece();
                    Tetris.calculateNextPiece();
                }
                Tetris.paintScreen();
                break;
            case 65:  // A
                // TODO: Llamar a la función "leftRotate" del objeto pieza
                break;
            case 68:  // A
                // TODO: Llamar a la función "rightRotate" del objeto pieza
                break;
        }
    },
    piecesFallMovement: function () {
        // Hace que la pieza actual caiga una casilla hacia abajo
        if (!Tetris.pieces_to_play.current_piece.downMove()) {
            Tetris.increaseScore(10);  // Incrementa la puntuación
            Tetris.changeCurrentPiece();
            Tetris.calculateNextPiece();
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
        // IDEA: Hacer una tabla y hacer uso de JQuery...
        // TODO: Mostrar el videojuego en el html
        var table = $("#tetris");
        table.empty();
        var content = "";
        for (var y = ROWS - 1; y >= 0; y--) {
            content += "<tr>";
            for (var x = 0; x < COLUMNS; x++) {
                // TODO: Mirar la variable "board" para saber el color de la pieza a pintar
                // Gris: #A9A9A9
                var color = (this.board[y][x] != 0) ? this.board[y][x] : "#A9A9A9";
                content += "<td style='background-color: " + color + "; width: 20px; height: 20px;'></td>";  // TODO: Dependiendo de la pieza se tendrá que pintar de un color o de otro
            }
            content += "</tr>";
        }
        table.append(content);
    },
    refreshScore: function () {
        $("#score").text(this.score);
    },
    initializeRoutine: function (miliseconds) {
        return setInterval((self) => {  // "self" hace referencia a la clase Tetris
            self.piecesFallMovement();
            self.paintScreen();
            console.log(self.routine_time);
        }, miliseconds, this);
    },
    killInterval: function () {
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