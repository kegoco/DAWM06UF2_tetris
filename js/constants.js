// Constantes utilizadas en el videojuego
const ROWS = 25;
const COLUMNS = 10;
const START_POSITION = [21, 4];  // y - x
const AVAILABLE_PIECES = [
    {
        name: "I",
        shape: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        color: "aqua"
    },
    {
        name: "J",
        shape: [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        color: "HotPink"
    },
    {
        name: "L",
        shape: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        color: "orange"
    },
    {
        name: "O",
        shape: [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        color: "yellow"
    },
    {
        name: "S",
        shape: [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        color: "red"
    },
    {
        name: "T",
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        color: "purple"
    },
    {
        name: "Z",
        shape: [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]
        ],
        color: "green"
    }
];