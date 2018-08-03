
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
enemyMap.addEventListener('kill', (e) => {
  console.log('killed a ', e.detail.enemy.class);
});
let ctxEnemyMap = enemyMap.getContext('2d');
let ctxEnemyMapDraw = object => {
  ctxEnemyMap.drawImage(object.image, object.xFrame, object.yFrame, object.pngWidth, object.pngHeight, object.x, object.y, object.spriteWidth, object.spriteHeight);
};

let deathCanvas = document.getElementById('death-canvas');
deathCanvas.width = 880;
deathCanvas.height = 605;
let ctxDeathCanvas = deathCanvas.getContext('2d');

let spriteMap = document.getElementById('sprite-map');
spriteMap.width = 880;
spriteMap.height = 605;
let ctxSpriteMap = spriteMap.getContext('2d');
let ctxSpriteMapDraw = object => {
  ctxSpriteMap.drawImage(object.image, object.xFrame, object.yFrame, object.pngWidth, object.pngHeight, object.x, object.y, object.spriteWidth, object.spriteHeight);
};

export {
  backgroundMap,
  ctxBackgroundMap,
  ctxBackgroundMapDraw,
  explosionCanvas,
  ctxExplosionCanvas,
  enemyMap,
  ctxEnemyMap,
  ctxEnemyMapDraw,
  deathCanvas,
  ctxDeathCanvas,
  spriteMap,
  ctxSpriteMap,
  ctxSpriteMapDraw
};
