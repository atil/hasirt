/// <reference path="../tsDefinitions/phaser.d.ts"/>
var HasirtContext = (function () {
    function HasirtContext() {
        this.game = new Phaser.Game(window.screen.availWidth, window.screen.availHeight, Phaser.AUTO, 'content', this);
    }
    HasirtContext.prototype.preload = function () {
        this.game.load.image('logo', "assets/phaser.png");
        this.game.load.image('left', 'assets/left.png');
        this.game.load.image('right', 'assets/right.png');
        this.game.load.image('up', 'assets/up.png');
        this.game.load.image('down', 'assets/down.png');
        this.game.load.image('leftSucc', 'assets/leftSucc.png');
        this.game.load.image('rightSucc', 'assets/rightSucc.png');
        this.game.load.image('upSucc', 'assets/upSucc.png');
        this.game.load.image('downSucc', 'assets/downSucc.png');
        this.game.load.image('blue', 'assets/blue.png');
    };
    HasirtContext.prototype.create = function () {
        this.wave = new Wave(this.game);
        this.game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(function () {
            this.onKeyReceived(Direction.ToRight, 'up');
        }, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(function () {
            this.onKeyReceived(Direction.ToRight, 'left');
        }, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function () {
            this.onKeyReceived(Direction.ToRight, 'down');
        }, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(function () {
            this.onKeyReceived(Direction.ToRight, 'right');
        }, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function () {
            this.onKeyReceived(Direction.ToLeft, 'up');
        }, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function () {
            this.onKeyReceived(Direction.ToLeft, 'left');
        }, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function () {
            this.onKeyReceived(Direction.ToLeft, 'down');
        }, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function () {
            this.onKeyReceived(Direction.ToLeft, 'right');
        }, this);
    };
    HasirtContext.prototype.update = function () {
        var dt = this.game.time.elapsed / 1000;
        this.wave.update(dt);
    };
    HasirtContext.prototype.onKeyReceived = function (sender, key) {
        this.wave.processCommand(sender, key);
    };
    return HasirtContext;
}());
window.onload = function () {
    var h = new HasirtContext();
};
var Direction;
(function (Direction) {
    Direction[Direction["ToLeft"] = 0] = "ToLeft";
    Direction[Direction["ToRight"] = 1] = "ToRight";
})(Direction || (Direction = {}));
var Wave = (function () {
    function Wave(game) {
        this.visual = game.add.sprite(game.world.centerX, game.world.centerY, 'blue');
        this.worldCenterX = game.world.centerX;
        this.worldCenterY = game.world.centerY;
        this.keyGroup = game.add.group();
        this.reset();
    }
    Wave.prototype.reset = function () {
        this.sequence = ['left', 'right', 'up', 'down'];
        this.direction = Direction.ToLeft;
        this.realign();
    };
    Wave.prototype.realign = function () {
        this.keyGroup.removeAll();
        var sampleArrow;
        for (var i = 0; i < this.sequence.length; i++) {
            sampleArrow = this.keyGroup.create(0, 0, this.sequence[i]);
        }
        this.keyGroup.align((sampleArrow.width + 10) * this.keyGroup.length, sampleArrow.height * 2, sampleArrow.width + 10, sampleArrow.height);
        this.keyGroup.x = this.worldCenterX - this.keyGroup.width * 0.5;
        this.keyGroup.y = this.worldCenterY * 1.4;
        this.currentIndex = 0;
    };
    Wave.prototype.processCommand = function (sender, key) {
        if (sender == this.direction) {
            return;
        }
        if (key == this.sequence[this.currentIndex]) {
            this.succEffect(this.keyGroup.children[this.currentIndex], key);
            this.currentIndex++;
        }
        else if (this.currentIndex == this.sequence.length) {
            this.sequence.push(key);
            this.keyGroup.create(0, 0, key);
            this.realign();
            this.direction = 1 - this.direction;
        }
        else {
            this.realign();
        }
    };
    Wave.prototype.succEffect = function (sprite, key) {
        sprite.loadTexture(key + "Succ");
    };
    Wave.prototype.update = function (dt) {
        var spd = (this.direction == Direction.ToLeft ? -1 : 1) * 100 * dt;
        this.visual.position.x += spd;
    };
    return Wave;
}());
