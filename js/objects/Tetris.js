// Objeto del videojuego
var Tetris = {
    // Variables
    game_state: false,  // true = Juego en marcha, false = Fin del juego
    board: [],  // x = 10, y = 25; 0 -> vacío, 1 -> Lleno
    board_state: false,  // true = Puede instanciar pieza, false = No puede instanciar más piezas
    score: 0,
    max_score: 0,
    pieces_to_play: {
        current_piece: {},
        next_piece : {}
    },
    used_pieces: {
        "i": 0,
        "j": 0,
        "l": 0,
        "o": 0,
        "s": 0,
        "t": 0,
        "z": 0
    },
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
            next_piece : {}
        };
        this.used_pieces = {
            "i": 0,
            "j": 0,
            "l": 0,
            "o": 0,
            "s": 0,
            "t": 0,
            "z": 0
        };
        this.routine = this.initializeRoutine(1000);  // Inicializa el intervalo a 1 segundo

        console.log("::: TETRIS INICIALIZADO :::");
    },
    calculateNextPiece: function () {
        // Calcular de forma aleatoria la siguiente pieza

    },
    moveCurrentPiece: function () {
        // Controla el movimiento (izquierda/derecha) de la pieza actual y la rotación de la misma

    },
    piecesFallMovement: function () {
        // Hace que la pieza actual caiga una casilla hacia abajo

    },
    initializeBoard: function () {
        var result = [];
        for (var x = 0; x < COLUMNS; x++) {
            result.push([]);
            for (var y = 0; y < ROWS; y++) {
                result[x].push(0);
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
        return value;
    },
    initializeRoutine: function (miliseconds) {
        return setInterval((self) => {  // "self" hace referencia a la clase Tetris
            // Falta hacer la funcionalidad...

        }, miliseconds, this);
    },
    killInterval: function () {
        clearInterval(this.routine);
        this.routine = undefined;
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