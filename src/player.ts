class Player 
{
    public onKeyCommand : Phaser.Signal = new Phaser.Signal();

    protected visual : Phaser.Sprite;
    protected direction : Direction;

    constructor(game : Phaser.Game, dir : Direction) {
        this.direction = dir;
        this.visual = game.add.sprite(0, game.world.centerY, 'red');
        var xCoord = dir == Direction.ToRight ? 0 : game.world.width - this.visual.width;
        this.visual.x = xCoord;
    }

    protected dispatchCommand(key : string) {
        this.onKeyCommand.dispatch(this.direction, key);
    }

    public getWidth() : number {
        return this.visual.width;
    }
}

class WasdPlayer extends Player 
{
    constructor(game : Phaser.Game, dir : Direction) {
        super(game, dir);

        game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(() => {
            this.dispatchCommand('up');
		}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(() => {
            this.dispatchCommand('left');
		}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(() => {
            this.dispatchCommand('down');
		}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(() => {
            this.dispatchCommand('right');
		}, this);
    }
}

class ArrowsPlayer extends Player 
{
    constructor(game : Phaser.Game, dir : Direction) {
        super(game, dir);

        game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(() => {
            this.dispatchCommand('up');
		}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(() => {
            this.dispatchCommand('left');
		}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(() => {
            this.dispatchCommand('down');
		}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(() => {
            this.dispatchCommand('right');
		}, this);
    }
}

// Network players gonna be here...