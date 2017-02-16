function preloadWave(game) {
    game.load.image('left', 'assets/left.png');
    game.load.image('right', 'assets/right.png');
    game.load.image('up', 'assets/up.png');
    game.load.image('down', 'assets/down.png');
}

function initWave(game) {
    var wave = game.add.sprite(game.rect.x, game.rect.y, 'blue');
    wave.anchor.setTo(0.5, 0.5);
    wave.sequence = [
        'up', 'down', 'left', 'right'
    ]
    wave.result = {
        continue : 1,
        complete : 2,
        fail : 3,
    }

    wave.reAlign = function () {
        wave.group.align(game.rect.width - 50, sprite.height * 2 , sprite.width + 10, sprite.height);
    }


    wave.group = game.add.group();
    var sprite;
    for (var i = 0; i < wave.sequence.length; i++) {
        sprite = wave.group.create(0, 0, wave.sequence[i]);
    }
    
    wave.reAlign();

    wave.group.x = game.rect.width * 0.5;
    wave.group.y = game.rect.height * 0.3;

    wave.current = 0;

    return wave;
}

function processKeyPress(wave, key) {
    if (key == wave.sequence[wave.current]) {
        wave.current++;
        console.log(" 1 " + wave.continue)
        return wave.result.continue;
    } else if (wave.current == wave.sequence.length) {
        wave.sequence.push(key);
        wave.group.create(0, 0, key);
        wave.reAlign();
        wave.current = 0;
        console.log(" 2 " + wave.complete)
        return wave.result.complete;
    } else {
        wave.current = 0;
        console.log(" 3 " + wave.fail)
        return wave.result.fail;
    }
}

function updateWave(wave, dir, dt) {
    var spd = (dir ? 1 : -1) * 15;
    wave.position.x += spd * dt;

}