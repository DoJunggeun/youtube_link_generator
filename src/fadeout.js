export { fadeOut, fadeOutAction, changeOpacity };

function fadeOut(target) {
    let level = 1;
    let outTimer = null;
    outTimer = setInterval(() => {
        level = fadeOutAction(target, level, outTimer);
    }, 30);
}

function fadeOutAction(target, level, outTimer) {
    level = level - 0.1;
    changeOpacity(target, level);
    if (level < 0) {
        clearInterval(outTimer);
    }
    return level;
}

function changeOpacity(target, level) {
    let obj = target;
    obj.style.opacity = level;
    obj.style.MozOpacity = level;
    obj.style.KhtmlOpacity = level;
    obj.style.MsFilter = "'progid: DXImageTransform.Microsoft.Alpha(Opacity=" + level * 100 + ")'";
    obj.style.filter = 'alpha(opacity=' + level * 100 + ")'";
}