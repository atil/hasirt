/// <reference path="../tsDefinitions/phaser.d.ts"/>

class HasirtGame
{
	game : Phaser.Game;
	wave : Wave;

	constructor() {
		this.game = new Phaser.Game(
					window.screen.availWidth, 
					window.screen.availHeight, 
					Phaser.AUTO, 'content', 
					{ 
						preload : this.preload, 
						create : this.create, 
						update : this.update
					});
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
		// this.game.stage.backgroundColor = 0xB20059;
	}
	
	create() {
		// var logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
		// logo.anchor.setTo( 0.5, 0.5 );
		
		this.wave = new Wave(this.game);
	}

	update() {
		var dt = this.game.time.elapsed / 1000;
		this.wave.update(dt);
	}
}

window.onload = () => {
	var h = new HasirtGame();
}