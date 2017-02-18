function preloadWave(game) {
    game.load.image('left', 'assets/left.png');
    game.load.image('right', 'assets/right.png');
    game.load.image('up', 'assets/up.png');
    game.load.image('down', 'assets/down.png');

    game.load.image('leftSucc', 'assets/leftSucc.png');
    game.load.image('rightSucc', 'assets/rightSucc.png');
    game.load.image('upSucc', 'assets/upSucc.png');
    game.load.image('downSucc', 'assets/downSucc.png');
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

    wave.group = game.add.group();
    var sampleArrow;
    for (var i = 0; i < wave.sequence.length; i++) {
        sampleArrow = createArrow(wave, wave.sequence[i])
    }

    wave.reAlign = function () {
        wave.group.align((sampleArrow.width + 10) * wave.group.length,
            sampleArrow.height * 2, 
            sampleArrow.width + 10, 
            sampleArrow.height);

        wave.group.x = game.rect.width * 0.5 - wave.group.width * 0.5;
        wave.group.y = game.rect.height * 0.7;
    }

    wave.reAlign();
    wave.current = 0;

    return wave;
}

function processKeyPress(wave, key) {
    if (key == wave.sequence[wave.current]) {
        succEffect(wave.group[wave.current]);
        wave.current++;
        return wave.result.continue;
    } else if (wave.current == wave.sequence.length) {
        wave.sequence.push(key);
        createArrow(wave, key);
        wave.reAlign();
        wave.current = 0;
        return wave.result.complete;
    } else {
        wave.current = 0;
        return wave.result.fail;
    }
}

function updateWave(wave, dir, dt) {
    var spd = (dir ? 1 : -1) * 15;
    wave.position.x += spd * dt;
}