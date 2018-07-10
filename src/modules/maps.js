
let backgroundMap = document.getElementById('background-map');
backgroundMap.width = 880;
backgroundMap.height = 605;
let ctxBackgroundMap = backgroundMap.getContext('2d');

let explosionCanvas = document.getElementById('explosion-canvas');
explosionCanvas.width = 880;
explosionCanvas.height = 605;
let ctxExplosionCanvas = explosionCanvas.getContext('2d');

let enemyMap = document.getElementById('enemy-map');
enemyMap.width = 880;
enemyMap.height = 605;
let ctxEnemyMap = enemyMap.getContext('2d');
// let ctxEnemyMapDraw = enemy => {
//   ctxEnemyMap.drawImage(enemy.image, enemy.xFrame, enemy.yFrame, enemy.pngWidth, enemy.pngHeight, enemy.x, enemy.y, enemy.spriteWidth, enemy.spriteHeight);
// };

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
  explosionCanvas,
  ctxExplosionCanvas,
  enemyMap,
  ctxEnemyMap,
  deathCanvas,
  ctxDeathCanvas,
  spriteMap,
  ctxSpriteMap
};
