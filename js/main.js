// ::: Script principal :::
Tetris.initialize();

// Reinicia el videojuego cuando el usuario pulse el botón de reiniciar
$("#go-restart").click(function () {
    $("#go-container").css("display", "none");  // Oculta la ventana de GameOver.
    Tetris.initialize();
});