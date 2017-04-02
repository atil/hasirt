var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        this.game.load.image('red', 'assets/red.png');
    };
    HasirtContext.prototype.create = function () {
        this.wave = new Wave(this.game);
        this.wasdPlayer = new WasdPlayer(this.game, Direction.ToRight);
        this.wasdPlayer.onKeyCommand.add(function () {
            this.onKeyReceived(arguments[0], arguments[1]);
        }, this);
        this.arrowsPlayer = new ArrowsPlayer(this.game, Direction.ToLeft);
        this.arrowsPlayer.onKeyCommand.add(function () {
            this.onKeyReceived(arguments[0], arguments[1]);
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
var Player = (function () {
    function Player(game, dir) {
        this.onKeyCommand = new Phaser.Signal();
        this.direction = dir;
        this.visual = game.add.sprite(0, game.world.centerY, 'red');
        var xCoord = dir == Direction.ToRight ? 0 : game.world.width - this.visual.width;
        this.visual.x = xCoord;
    }
    Player.prototype.dispatchCommand = function (key) {
        this.onKeyCommand.dispatch(this.direction, key);
    };
    return Player;
}());
var WasdPlayer = (function (_super) {
    __extends(WasdPlayer, _super);
    function WasdPlayer(game, dir) {
        var _this = _super.call(this, game, dir) || this;
        game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(function () {
            _this.dispatchCommand('up');
        }, _this);
        game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(function () {
            _this.dispatchCommand('left');
        }, _this);
        game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function () {
            _this.dispatchCommand('down');
        }, _this);
        game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(function () {
            _this.dispatchCommand('right');
        }, _this);
        return _this;
    }
    return WasdPlayer;
}(Player));
var ArrowsPlayer = (function (_super) {
    __extends(ArrowsPlayer, _super);
    function ArrowsPlayer(game, dir) {
        var _this = _super.call(this, game, dir) || this;
        game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function () {
            _this.dispatchCommand('up');
        }, _this);
        game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function () {
            _this.dispatchCommand('left');
        }, _this);
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function () {
            _this.dispatchCommand('down');
        }, _this);
        game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function () {
            _this.dispatchCommand('right');
        }, _this);
        return _this;
    }
    return ArrowsPlayer;
}(Player));
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
