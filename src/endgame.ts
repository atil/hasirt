class EndgameState extends Phaser.State
{
    public init(result : WaveUpdateResult) : void {
         var endgame = this.game.add.sprite(this.game.world.centerX, 
            this.game.world.centerY, 'endgame');

        endgame.width = this.game.width;
        endgame.height = this.game.height;
        endgame.anchor.setTo(0.5, 0.5);

        var style = { font: "bold 32px Arial", fill: "#fff", 
            boundsAlignH: "center", boundsAlignV: "middle" };

        var winText = result == WaveUpdateResult.LeftWon ? "Left won" : "Right won";
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, winText, style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(() => {
            this.game.state.start('game');
        });
    }

}