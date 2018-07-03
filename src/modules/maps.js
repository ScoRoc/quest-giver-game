//Defining backgroundMap canvas
// let backgroundMap = document.getElementById('background-map');
// backgroundMap.width = 512;
// backgroundMap.height = 352;
// backgroundMap.width = 800;
// backgroundMap.height = 352;

// let ctxBackgroundMap = backgroundMap.getContext('2d');

//Defining sprite and enemy map canvas'
let explosionCanvas = document.getElementById('explosion-canvas');
let ctxExplosionCanvas = explosionCanvas.getContext('2d');
// explosionCanvas.width = 512;
// explosionCanvas.height = 352;
explosionCanvas.width = 800;
explosionCanvas.height = 352;

let enemyMap = document.getElementById('enemy-map');
let ctxEnemyMap = enemyMap.getContext('2d');
// enemyMap.width = 512;
// enemyMap.height = 352;
enemyMap.width = 800;
enemyMap.height = 352;

let deathCanvas = document.getElementById('death-canvas');
let ctxDeathCanvas = deathCanvas.getContext('2d');
// deathCanvas.width = 512;
// deathCanvas.height = 352;
deathCanvas.width = 800;
deathCanvas.height = 352;

let spriteMap = document.getElementById('sprite-map');
let ctxSpriteMap = spriteMap.getContext('2d');
// spriteMap.width = 512;
// spriteMap.height = 352;
spriteMap.width = 800;
spriteMap.height = 352;

let winCanvas = document.getElementById('win-canvas');
let ctxWinCanvas = winCanvas.getContext('2d');
// winCanvas.width = 512;
// winCanvas.height = 352;
winCanvas.width = 800;
winCanvas.height = 352;

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
  ctxSpriteMap,
  winCanvas,
  ctxWinCanvas
};
