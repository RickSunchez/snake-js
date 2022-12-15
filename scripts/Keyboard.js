class Keyboard {
    constructor(game) {
        this.game = game;
        this.bind();
    }

    bind() {
        window.addEventListener(
            "keyup",
            this.eventHandler.bind(this)
        );
    }

    eventHandler(event) {
        switch (event.code) {
            case "KeyW":
                this.game.moveUp();
                break;
            case "KeyA":
                this.game.moveLeft();
                break;
            case "KeyS":
                this.game.moveDown();
                break;
            case "KeyD":
                this.game.moveRight();
                break;
            case "Space":
                this.game.loop();
                break;
        }
    }
}