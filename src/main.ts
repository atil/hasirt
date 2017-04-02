/// <reference path="../tsDefinitions/phaser.d.ts"/>

class HasirtContext
{
	private game : Phaser.Game;
	private wave : Wave;
	private wasdPlayer : WasdPlayer;
	private arrowsPlayer : ArrowsPlayer;

	constructor() {
		this.game = new Phaser.Game(window.screen.availWidth, window.screen.availHeight, 
		Phaser.AUTO, 'content');

		this.game.state.add('menu', new MenuState());
		this.game.state.add('game', new GameState());
		this.game.state.add('endgame', new EndgameState());
		this.game.state.start('menu');
	}
	
	preload() : void {
		
	}
	
	create() : void {
		
		this.wasdPlayer = new WasdPlayer(this.game, Direction.ToRight);
		this.wasdPlayer.onKeyCommand.add(function() {
			this.onKeyReceived(arguments[0], arguments[1])
		}, this);
		this.arrowsPlayer = new ArrowsPlayer(this.game, Direction.ToLeft);
		this.arrowsPlayer.onKeyCommand.add(function() {
			this.onKeyReceived(arguments[0], arguments[1])
		}, this);
		
		this.wave = new Wave(this.game, this.wasdPlayer.getWidth());
		
	}

	update() : void {
		var dt = this.game.time.elapsed / 1000;
		var result = this.wave.update(dt);

		if (result != WaveUpdateResult.Continue) {
			// Change state
		}
	}

	onKeyReceived(sender : Direction, key : string) : void {
		this.wave.processCommand(sender, key);
	}
}

window.onload = () => {
	var h = new HasirtContext();
}