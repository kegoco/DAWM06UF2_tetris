// Objeto del juego...
var Tetris = {
    game_state: "",  // ?????????????
    board: [],  // x = 10, y = 25; 0 -> vacío, 1 -> Lleno
    board_state: "",  // ?????????????
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
    initialize: function () {
        console.log("::: Inicializa Tetris :::");
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
    - El intervalo también comprobará el fin de partida (cuando la nueva
    pieza no pueda instanciarse, porque su casilla ya está ocupada).
    - Tener en cuenta la puntuación del jugador...
*/