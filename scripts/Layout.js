class Layout {
    typeEmpty = 0;
    typeFill = 1;
    typeFood = 2;

    constructor (
        parentSelector,
        width, 
        height
    ) {
        this.parent = document.querySelector(parentSelector);
        this.width = width;
        this.height = height;
        this.map = this.__generateMap(this.width, this.height);
        this.__generateTiles(this.map);
    }

    drawTile(x, y, tileType) {
        const tile = this.__getTile(x, y);
        const type = this.__tileType(tileType);

        tile.className = `cell ${type}`;
        this.map[y][x] = tileType;
    }

    isFood(x, y) {
        const tile = this.__getTile(x, y);
        return tile.classList.contains(
            this.__tileType(this.typeFood)
        );
    }

    __getTile(x, y) {
        return this.parent.querySelector(`.row[y="${y}"] .cell[x="${x}"]`);
    }

    __generateMap(width, height) {
        var row = Array.from({
            length: width,
        }, () => 0);
        return Array.from({
            length: height
        }, () => row);
    }

    __generateTiles(gameMap) {
        var mapHTML = "";
        for (let y in gameMap) {
            mapHTML += `<div class="row" y="${y}">`
            for (let x in gameMap[y]) {
                let type = this.__tileType(gameMap[y][x]);
                mapHTML += `<div class="cell ${type}" x="${x}">`;
                mapHTML += `</div>`;
            }
            mapHTML += `</div>`;
        }

        this.parent.innerHTML = mapHTML;
    }

    __tileType(tileValue) {
        switch (tileValue) {
            case this.typeFood:
                return "food";
            case this.typeFill:
                return "fill";
            case this.typeEmpty:
            default:
                return "empty";
        }
    }
}