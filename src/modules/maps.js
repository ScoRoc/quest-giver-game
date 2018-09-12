
const backgroundMap = document.getElementById('background-map');
backgroundMap.width = 880;
backgroundMap.height = 605;
const ctxBackgroundMap = backgroundMap.getContext('2d');

const explosionCanvas = document.getElementById('explosion-canvas');
explosionCanvas.width = 880;
explosionCanvas.height = 605;
const ctxExplosionCanvas = explosionCanvas.getContext('2d');

const enemyMap = document.getElementById('enemy-map');
enemyMap.width = 880;
enemyMap.height = 605;
const ctxEnemyMap = enemyMap.getContext('2d');

const deathCanvas = document.getElementById('death-canvas');
deathCanvas.width = 880;
deathCanvas.height = 605;
const ctxDeathCanvas = deathCanvas.getContext('2d');

const spriteMap = document.getElementById('sprite-map');
spriteMap.width = 880;
spriteMap.height = 605;
const ctxSpriteMap = spriteMap.getContext('2d');

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
