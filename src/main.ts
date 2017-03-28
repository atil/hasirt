/// <reference path="../tsDefinitions/phaser.d.ts"/>

class HasirtContext
{
	private game : Phaser.Game;
	private wave : Wave;

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
	}
	
	create() {
		this.wave = new Wave(this.game);
		
		this.game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(function() {
			this.onKeyReceived(Direction.ToRight, 'up');
		}, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(function() {
			this.onKeyReceived(Direction.ToRight, 'left');
		}, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function() {
			this.onKeyReceived(Direction.ToRight, 'down');
		}, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(function() {
			this.onKeyReceived(Direction.ToRight, 'right');
		}, this);

		this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function() {
			this.onKeyReceived(Direction.ToLeft, 'up');
		}, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function() {
			this.onKeyReceived(Direction.ToLeft, 'left');
		}, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function() {
			this.onKeyReceived(Direction.ToLeft, 'down');
		}, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function() {
			this.onKeyReceived(Direction.ToLeft, 'right');
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