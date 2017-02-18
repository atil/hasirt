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

    wave.worldCenterX = game.rect.x;
    wave.worldCenterY = game.rect.y;

    wave.group = game.add.group();
    reset(wave);

    return wave;
}

function reset(wave) {
    wave.group.removeAll();
    var sampleArrow;
    for (var i = 0; i < wave.sequence.length; i++) {
        sampleArrow = wave.group.create(0,0, wave.sequence[i]);
    }
    wave.group.align((sampleArrow.width + 10) * wave.group.length,
        sampleArrow.height * 2, 
        sampleArrow.width + 10, 
        sampleArrow.height);

    wave.group.x = wave.worldCenterX - wave.group.width * 0.5;
    wave.group.y = wave.worldCenterY * 1.4;
    wave.current = 0;
    
}

function processKeyPress(wave, key) {
    if (key == wave.sequence[wave.current]) {
        succEffect(wave.group.getAt(wave.current), key);
        wave.current++;
        return wave.result.continue;
    } else if (wave.current == wave.sequence.length) {
        wave.sequence.push(key);
        wave.group.create(0,0, key);
        reset(wave);
        return wave.result.complete;
    } else {
        reset(wave);
        return wave.result.fail;
    }
}

function succEffect(sprite, dir) {
	sprite.loadTexture(dir + "Succ");
}

function updateWave(wave, dir, dt) {
    var spd = (dir ? 1 : -1) * 150;
    wave.position.x += spd * dt;
}