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
            "I": 0,
            "J": 0,
            "L": 0,
            "O": 0,
            "S": 0,
            "T": 0,
            "Z": 0
        };
        this.pieces_count = 0;
        this.level = 1;
        document.addEventListener('keydown', this.moveCurrentPiece);  // Inicializa el evento para recibir ordenes del teclado
        this.createRoutine();

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

        // TODO: Crear una pieza y pasarle a su constructor los datos de la variable "data"
        // TODO: Guardar la pieza "pieces_to_play/next_piece"
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
            this.level++;
            this.createRoutine();
        }
    },
    createRoutine: function () {
        // Destruye el intervalo actual y crea otro
        this.killInterval();
        var time = 1100 - ((1100 * (10 * this.level)) / 100);
        this.routine = this.initializeRoutine(time);  // Inicializa el intervalo
    },
    moveCurrentPiece: function (event) {
        // Controla el movimiento (izquierda/derecha) de la pieza actual y la rotación de la misma
        switch (event.keyCode) {
            case 37:  // izquierda
                // TODO: Llamar a la función "leftMove" del objeto pieza
                break;
            case 39:  // derecha
                // TODO: Llamar a la función "rightMove" del objeto pieza
                break;
            case 40:  // abajo
                // TODO: Bajar la pieza
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
        // TODO: Llamar a la función "downMove" del objeto pieza.
        /*
            IDEA
            La función "downMove" devolverá true si ha podido realizar el movimiento, sino
            devolverá false para dar paso a la siguiente pieza.
        */
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
    increaseScore: function (points) {
        // Incrementa la puntuación
        this.score += points;
    },
    paintScreen: function () {
        // Muestra el videojuego por pantalla
        // IDEA: Hacer una tabla y hacer uso de JQuery...
        // TODO: Mostrar el videojuego en el html
    },
    initializeRoutine: function (miliseconds) {
        return setInterval((self) => {  // "self" hace referencia a la clase Tetris
            self.piecesFallMovement();
            self.paintScreen();
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