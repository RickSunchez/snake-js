window.addEventListener("load", function(event) {
    const snake = new Snake();
    const layout = new Layout("#app", 11, 11);
    const game = new Game(
        layout,
        snake,
        5, 5
    );
    const keyboard = new Keyboard(game);
});