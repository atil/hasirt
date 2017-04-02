/// <reference path="../tsDefinitions/phaser.d.ts"/>

class HasirtContext
{
	private game : Phaser.Game;

	constructor() {
		this.game = new Phaser.Game(window.screen.availWidth, window.screen.availHeight, 
		Phaser.AUTO, 'content');

		this.game.state.add('menu', new MenuState());
		this.game.state.add('game', new GameState());
		this.game.state.add('endgame', new EndgameState());
		
		this.game.state.start('menu');
	}
}

window.onload = () => {
	var h = new HasirtContext();
}