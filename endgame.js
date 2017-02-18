function preloadEndgame(game) {
    game.load.image('endgame', 'assets/endgame.png');
}

function initEndgame(game) {
    var endgame = game.add.sprite(game.rect.x, game.rect.y, 'endgame');
    endgame.width = game.rect.width;
    endgame.height = game.rect.height;
    endgame.anchor.setTo(0.5, 0.5);
    clearEndgame(endgame);
    return endgame;
}

function clearEndgame(endgame) {
    endgame.visible = false;
}

function showEndgame(endgame, dir) {
    endgame.visible = true;
}

function updateEndgame(endGame) {
    
}