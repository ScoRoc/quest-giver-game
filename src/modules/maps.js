
let backgroundMap = document.getElementById('background-map');
backgroundMap.width = 880;
backgroundMap.height = 605;
let ctxBackgroundMap = backgroundMap.getContext('2d');
let ctxBackgroundMapDraw = object => {
  ctxBackgroundMap.drawImage(object.image, object.xFrame, object.yFrame, object.pngWidth, object.pngHeight, 0, 0, object.mapWidth, object.mapHeight);
};

let explosionCanvas = document.getElementById('explosion-canvas');
explosionCanvas.width = 880;
explosionCanvas.height = 605;
let ctxExplosionCanvas = explosionCanvas.getContext('2d');

let enemyMap = document.getElementById('enemy-map');
enemyMap.width = 880;
enemyMap.height = 605;
let ctxEnemyMap = enemyMap.getContext('2d');

let deathCanvas = document.getElementById('death-canvas');
deathCanvas.width = 880;
deathCanvas.height = 605;
let ctxDeathCanvas = deathCanvas.getContext('2d');

let spriteMap = document.getElementById('sprite-map');
spriteMap.width = 880;
spriteMap.height = 605;
let ctxSpriteMap = spriteMap.getContext('2d');

export {
  backgroundMap,
  ctxBackgroundMap,
  ctxBackgroundMapDraw,
  explosionCanvas,
  ctxExplosionCanvas,
  enemyMap,
  ctxEnemyMap,
  deathCanvas,
  ctxDeathCanvas,
  spriteMap,
  ctxSpriteMap
};
