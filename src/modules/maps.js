//Defining backgroundMap canvas
let backgroundMap = document.getElementById('background-map');
let ctxBackgroundMap = backgroundMap.getContext('2d');
backgroundMap.width = 880;
backgroundMap.height = 605;


//Defining sprite and enemy map canvas'
let explosionCanvas = document.getElementById('explosion-canvas');
let ctxExplosionCanvas = explosionCanvas.getContext('2d');
explosionCanvas.width = 880;
explosionCanvas.height = 605;

let enemyMap = document.getElementById('enemy-map');
let ctxEnemyMap = enemyMap.getContext('2d');
enemyMap.width = 880;
enemyMap.height = 605;

let deathCanvas = document.getElementById('death-canvas');
let ctxDeathCanvas = deathCanvas.getContext('2d');
deathCanvas.width = 880;
deathCanvas.height = 605;

let spriteMap = document.getElementById('sprite-map');
let ctxSpriteMap = spriteMap.getContext('2d');
spriteMap.width = 880;
spriteMap.height = 605;

let winCanvas = document.getElementById('win-canvas');
let ctxWinCanvas = winCanvas.getContext('2d');
winCanvas.width = 880;
winCanvas.height = 605;

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
