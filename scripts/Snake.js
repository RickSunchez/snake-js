class Snake {
    constructor() {
        this.__coords = [];
    }

    move(x, y) {
        this.__coords.push([x, y]);
        return this.__coords.shift();
    }

    eat(x, y) {
        this.__coords.push([x, y]);
    }

    get coords() {
        return this.__coords;
    }
}