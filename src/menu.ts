class MenuState extends Phaser.State
{
    public preload() : void {
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

    public create() : void {
    }

    public update() : void {

    }
}