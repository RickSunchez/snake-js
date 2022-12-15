class Game {
    constructor (
        layout,
        snake,
        sx, sy
    ) {
        this.snake = snake;
        this.layout = layout;
        this.head = [sx, sy];
        this.inGame = false;
        this.timer = undefined;
        this.gameFPS = 5;

        this.dx = 1;
        this.dy = 0;

        this.snake.eat(...this.head);
        this.__drawSnake();
        this.__produceFood();
    }

    loop() {
        if (this.inGame) {
            clearInterval(this.timer);
            this.inGame = !this.inGame;
            return;
        }
        this.timer = setInterval(this.update.bind(this), 1000 / this.gameFPS);
        this.inGame = !this.inGame;
    }

    update() {
        this.__move(this.dx, this.dy);
    }

    moveUp()    { this.dx = 0;  this.dy = -1; }
    moveDown()  { this.dx = 0;  this.dy = 1; }
    moveLeft()  { this.dx = -1; this.dy = 0; }
    moveRight() { this.dx = 1;  this.dy = 0; }

    __move(dx, dy) {
        this.head = this.__processHead(dx, dy);
        this.dx = dx;
        this.dy = dy;

        let x = this.head[0];
        let y = this.head[1];

        if (this.layout.isFood(x, y)) {
            this.snake.eat(...this.head);
            this.__produceFood();
        } else {
            const tile = this.snake.move(...this.head);
            this.__erase(...tile);
        }

        this.__drawSnake();
    }

    __produceFood() {
        function arrayInArray(needle, haystack) {
            for (let hay of haystack) {
                if (hay[0] == needle[0] && hay[1] == needle[1]) {
                    return true;
                }
            }

            return false;
        }

        const tiles = this.snake.coords;
        var values = [];
        
        for (let x = 0; x < this.layout.width; x++) {
            for (let y = 0; y < this.layout.width; y++) {
                if (arrayInArray([x, y], tiles)) continue;
                values.push([x, y]);
            }
        }
        
        const foodId = parseInt(Math.random() * values.length);
        var value = values[foodId];

        this.__food(...value);
    }

    __snakeNumbers() {
        const tiles = this.snake.coords;
        var numbers = [];
        for (let tile of tiles) {
            numbers.push(10*tile[0] + tile[1]);
        }
        return numbers;
    }

    __processHead(dx, dy) {
        this.head[0] += dx;
        this.head[1] += dy;

        if (this.head[0] >= this.layout.width) {
            this.head[0] = 0;
        }
        if (this.head[0] < 0) {
            this.head[0] = this.layout.width - 1;
        }
        if (this.head[1] >= this.layout.height) {
            this.head[1] = 0;
        }
        if (this.head[1] < 0) {
            this.head[1] = this.layout.height - 1;
        }

        return this.head;
    }

    __drawSnake() {
        const tiles = this.snake.coords;

        for (let tile of tiles) {
            this.__fill(...tile);
        }
    }

    __fill(x, y) {
        this.layout.drawTile(x, y, this.layout.typeFill);
    }

    __food(x, y) {
        this.layout.drawTile(x, y, this.layout.typeFood);
    }

    __erase(x, y) {
        this.layout.drawTile(x, y, this.layout.typeEmpty);
    }
}