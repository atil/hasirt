/// <reference path="../tsDefinitions/phaser.d.ts"/>

class HasirtContext
{
	private game : Phaser.Game;
	private wave : Wave;
	private wasdPlayer : WasdPlayer;
	private arrowsPlayer : ArrowsPlayer;

	constructor() {
		this.game = new Phaser.Game( window.screen.availWidth, window.screen.availHeight, 
		Phaser.AUTO, 'content', this);
	}
	
	preload() {
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
	}
	
	create() {
		this.wave = new Wave(this.game);
		this.wasdPlayer = new WasdPlayer(this.game, Direction.ToRight);
		this.wasdPlayer.onKeyCommand.add(function() {
			this.onKeyReceived(arguments[0], arguments[1])
		}, this);
		this.arrowsPlayer = new ArrowsPlayer(this.game, Direction.ToLeft);
		this.arrowsPlayer.onKeyCommand.add(function() {
			this.onKeyReceived(arguments[0], arguments[1])
		}, this);
	}

	update() {
		var dt = this.game.time.elapsed / 1000;
		this.wave.update(dt);
	}

	onKeyReceived(sender : Direction, key : string) {
		this.wave.processCommand(sender, key);
	}
}

window.onload = () => {
	var h = new HasirtContext();
}