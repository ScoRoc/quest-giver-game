//Defining backgroundMap canvas
let backgroundMap = document.getElementById('background-map');
let ctxBackgroundMap = backgroundMap.getContext('2d');
backgroundMap.width = 800;
backgroundMap.height = 550;


//Defining sprite and enemy map canvas'
let explosionCanvas = document.getElementById('explosion-canvas');
let ctxExplosionCanvas = explosionCanvas.getContext('2d');
explosionCanvas.width = 800;
explosionCanvas.height = 550;

let enemyMap = document.getElementById('enemy-map');
let ctxEnemyMap = enemyMap.getContext('2d');
enemyMap.width = 800;
enemyMap.height = 550;

let deathCanvas = document.getElementById('death-canvas');
let ctxDeathCanvas = deathCanvas.getContext('2d');
deathCanvas.width = 800;
deathCanvas.height = 550;

let spriteMap = document.getElementById('sprite-map');
let ctxSpriteMap = spriteMap.getContext('2d');
spriteMap.width = 800;
spriteMap.height = 550;

let winCanvas = document.getElementById('win-canvas');
let ctxWinCanvas = winCanvas.getContext('2d');
winCanvas.width = 800;
winCanvas.height = 550;

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
