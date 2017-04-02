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
var EndgameState = (function (_super) {
    __extends(EndgameState, _super);
    function EndgameState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndgameState.prototype.init = function (result) {
        var _this = this;
        var endgame = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'endgame');
        endgame.width = this.game.width;
        endgame.height = this.game.height;
        endgame.anchor.setTo(0.5, 0.5);
        var style = { font: "bold 32px Arial", fill: "#fff",
            boundsAlignH: "center", boundsAlignV: "middle" };
        var winText = result == WaveUpdateResult.LeftWon ? "Left won" : "Right won";
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, winText, style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function () {
            _this.game.state.start('game');
        });
    };
    return EndgameState;
}(Phaser.State));
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameState.prototype.init = function () {
        this.wasdPlayer = new WasdPlayer(this.game, Direction.ToRight);
        this.wasdPlayer.onKeyCommand.add(function () {
            this.onKeyReceived(arguments[0], arguments[1]);
        }, this);
        this.arrowsPlayer = new ArrowsPlayer(this.game, Direction.ToLeft);
        this.arrowsPlayer.onKeyCommand.add(function () {
            this.onKeyReceived(arguments[0], arguments[1]);
        }, this);
        this.wave = new Wave(this.game, this.wasdPlayer.getWidth());
    };
    GameState.prototype.update = function () {
        var dt = this.game.time.elapsed / 1000;
        var result = this.wave.update(dt);
        if (result != WaveUpdateResult.Continue) {
            this.game.state.start('endgame', false, false, result);
        }
    };
    GameState.prototype.onKeyReceived = function (sender, key) {
        this.wave.processCommand(sender, key);
    };
    return GameState;
}(Phaser.State));
/// <reference path="../tsDefinitions/phaser.d.ts"/>
var HasirtContext = (function () {
    function HasirtContext() {
        this.game = new Phaser.Game(window.screen.availWidth, window.screen.availHeight, Phaser.AUTO, 'content');
        this.game.state.add('menu', new MenuState());
        this.game.state.add('game', new GameState());
        this.game.state.add('endgame', new EndgameState());
        this.game.state.start('menu');
    }
    return HasirtContext;
}());
window.onload = function () {
    var h = new HasirtContext();
};
var MenuState = (function (_super) {
    __extends(MenuState, _super);
    function MenuState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuState.prototype.preload = function () {
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
        this.game.load.image('endgame', 'assets/endgame.png');
    };
    MenuState.prototype.init = function () {
        var _this = this;
        this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function () {
            _this.game.state.start('game');
        });
    };
    return MenuState;
}(Phaser.State));
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
    Player.prototype.getWidth = function () {
        return this.visual.width;
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
// Network players gonna be here... 
var Direction;
(function (Direction) {
    Direction[Direction["ToLeft"] = 0] = "ToLeft";
    Direction[Direction["ToRight"] = 1] = "ToRight";
})(Direction || (Direction = {}));
var WaveUpdateResult;
(function (WaveUpdateResult) {
    WaveUpdateResult[WaveUpdateResult["Continue"] = 0] = "Continue";
    WaveUpdateResult[WaveUpdateResult["LeftWon"] = 1] = "LeftWon";
    WaveUpdateResult[WaveUpdateResult["RightWon"] = 2] = "RightWon";
})(WaveUpdateResult || (WaveUpdateResult = {}));
var Wave = (function () {
    function Wave(game, agentWidth) {
        this.visual = game.add.sprite(game.world.centerX, game.world.centerY, 'blue');
        this.worldCenterX = game.world.centerX;
        this.worldCenterY = game.world.centerY;
        this.leftX = agentWidth;
        this.rightX = game.world.width - agentWidth;
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
        if (this.visual.position.x < this.leftX) {
            return WaveUpdateResult.RightWon;
        }
        else if (this.visual.position.x > this.rightX) {
            return WaveUpdateResult.LeftWon;
        }
        else {
            return WaveUpdateResult.Continue;
        }
    };
    return Wave;
}());
