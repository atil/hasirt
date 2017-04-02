class GameState extends Phaser.State
{
    private wave : Wave;
	private wasdPlayer : WasdPlayer;
	private arrowsPlayer : ArrowsPlayer;

    public init() : void {
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

    public update() : void {
        var dt = this.game.time.elapsed / 1000;
		var result = this.wave.update(dt);

		if (result != WaveUpdateResult.Continue) {
			this.game.state.start('endgame', false, false, result);
		}
    }

    onKeyReceived(sender : Direction, key : string) : void {
		this.wave.processCommand(sender, key);
	}
}