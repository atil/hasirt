function createArrow(wave, dirStr) {
    var arrow = wave.group.create(0,0, dirStr);
    arrow.dirStr = dirStr;
    return arrow;
}

function succEffect(arrow) {
    arrow.loadTexture(arrow.dirStr + "Succ");
}