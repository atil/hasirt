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
        this.reset();
    }		

    public reset() {
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

    public processCommand(sender : Direction, key : string) {
        console.log(sender, key)

        if (sender == this.direction) {
            return;
        }

        if (key == this.sequence[this.currentIndex]) {
            this.succEffect(<Phaser.Sprite>this.keyGroup.children[this.currentIndex], key);
            this.currentIndex++;
        } else if (this.currentIndex == this.sequence.length) {
            this.sequence.push(key);
            this.keyGroup.create(0, 0, key);
            this.realign();
            this.direction = 1 - this.direction;
        } else {
            this.realign();
        }
    }

    private succEffect(sprite : Phaser.Sprite, key : string) {
        sprite.loadTexture(key + "Succ");
    }

    public update(dt : number) {
        var spd = (this.direction == Direction.ToLeft ? 1 : -1) * 100 * dt;
        this.visual.position.x += spd;
    }
}