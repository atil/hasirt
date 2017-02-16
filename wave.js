function preloadWave(game) {

    game.load.image('left', 'assets/left.png');
    game.load.image('right', 'assets/right.png');
    game.load.image('up', 'assets/up.png');
    game.load.image('down', 'assets/down.png');
}

function initWave(game) {

    var wave = game.add.sprite(game.rect.x, game.rect.y, 'blue');
    wave.anchor.setTo(0.5, 0.5);

    var group = game.add.group();
    var left;
    for (var i = 0; i < 5; i++) {
        left = group.create(0, 0, 'left');
    }
    group.align(game.rect.width - 50, left.height * 2 , left.width + 10, left.height, Phaser.BOTTOM_RIGHT);

    group.x = game.rect.width * 0.5;
    group.y = game.rect.height * 0.3;

    return wave;
}

function updateWave(wave, dt) {

    wave.position.x += 15 * dt;

}