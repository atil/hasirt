/// <reference path="main.ts"/>

enum WaveResult {
    continue, complete, fail 
}

enum Direction {
	ToLeft, ToRight
}

class Wave
{
    private visual : Phaser.Sprite;
    private keyGroup : Phaser.Group;
    private worldCenterX : number;
    private worldCenterY : number;

    private sequence : string[];
	private direction : Direction;
    private currentIndex : number;

    constructor(game : Phaser.Game) {
        this.visual = game.add.sprite(game.world.centerX, game.world.centerY, 'blue');

        this.worldCenterX = game.world.centerX;
        this.worldCenterY = game.world.centerY;
        this.keyGroup = game.add.group();
        this.sequence = ['left', 'right', 'up', 'down'];
        this.direction = Direction.ToLeft;

        this.realign();
    }		

    private realign() {
        this.keyGroup.removeAll();
        var sampleArrow;
        for (var i = 0; i < this.sequence.length; i++) {
            sampleArrow = this.keyGroup.create(0,0, this.sequence[i]);
        }

        this.keyGroup.align((sampleArrow.width + 10) * this.keyGroup.length,
            sampleArrow.height * 2, 
            sampleArrow.width + 10, 
            sampleArrow.height);

        this.keyGroup.x = this.worldCenterX - this.keyGroup.width * 0.5;
        this.keyGroup.y = this.worldCenterY * 1.4;
        this.currentIndex = 0;
    }

    public update(dt : number) {
        var spd = (this.direction == Direction.ToLeft ? 1 : -1) * 100 * dt;
        this.visual.position.x += spd;
    }
}