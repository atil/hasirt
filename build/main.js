/// <reference path="../tsDefinitions/phaser.d.ts"/>
var HasirtGame = (function () {
    function HasirtGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    HasirtGame.prototype.preload = function () {
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
        // this.game.stage.backgroundColor = 0xB20059;
    };
    HasirtGame.prototype.create = function () {
        // var logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
        // logo.anchor.setTo( 0.5, 0.5 );
        this.wave = new Wave(this.game);
    };
    HasirtGame.prototype.update = function () {
        var dt = this.game.time.elapsed / 1000;
        this.wave.update(dt);
    };
    return HasirtGame;
}());
window.onload = function () {
    var h = new HasirtGame();
};
/// <reference path="main.ts"/>
var WaveResult;
(function (WaveResult) {
    WaveResult[WaveResult["continue"] = 0] = "continue";
    WaveResult[WaveResult["complete"] = 1] = "complete";
    WaveResult[WaveResult["fail"] = 2] = "fail";
})(WaveResult || (WaveResult = {}));
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
        this.sequence = ['left', 'right', 'up', 'down'];
        this.direction = Direction.ToLeft;
        this.realign();
    }
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
    Wave.prototype.update = function (dt) {
        var spd = (this.direction == Direction.ToLeft ? 1 : -1) * 100 * dt;
        this.visual.position.x += spd;
    };
    return Wave;
}());
