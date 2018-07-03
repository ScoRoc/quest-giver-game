import { coinFlip, xStarting, yStarting } from './modules/mathHelpers.js';
import { newImage } from './modules/nonMathHelpers.js';
import { heart, bigHeart } from './modules/items/hearts.js';
import {
  tektite,
  keese,
  gibdo,
  stalfos,
  dodongo,
  armos,
  wizzrobe,
  darknut,
  aquamentus,
  moblin
} from './modules/enemyImporter.js';
import {
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
} from './modules/maps.js';
import {
  gameOverScreen,
  gameOver,
  linkDies
} from './modules/gameState/gameStateImporter.js';
import { heartCollisionDetection, enemyCollisionDetection } from './modules/collisionDetectors/collisionDetectorImporter.js';
import { xRightResetOffscreenEnemies, xLeftResetOffscreenEnemies, yResetOffscreenEnemies } from './modules/resetEnemyHelpers.js';
import link from './modules/player.js';


//Game info and functions
let game = {
  over: true,  //tracks game over or not
  level: 1,  //which level player is on
  now: null,  //current game time
  endTime: null,  //tracks game end time

  setGameNow: function() {  //sets game time
    game.now = Date.now();
  }

};

let background = {
  image: newImage('images/overworld_map.png'),
  winImage: newImage('images/castle.png'),
  xFrame: (Math.floor(Math.random() * 16)) * 256,  //x axis start of current map frame (from src img)
  yFrame: (Math.floor(Math.random() * 8)) * 176,  //y axis start of current map frame (from src img)
  moveSpeed: 4,  //speed at which map moves frames
  mapCounter: 0,  //count map frame slides for map move function
  pngWidth: 256,  //map frame width from src img
  pngHeight: 176,  //map frame height from src img
  mapWidth: backgroundMap.width,  //how wide the background will be on canvas
  mapHeight: backgroundMap.height,  //how tall the background will be on canvas
  moveMapFrameAnimation: null,
  mapMoving: false,  //tracks if map is moving
  moveMapUp: false,  //turns on map moving up
  moveMapDown: false,  //turns on map moving down
  moveMapLeft: false,  //turns on map moving left
  moveMapRight: false,  //turns on map moving right

  moveMapFrameUpStart: function() {
      link.yMove += (background.moveSpeed * 1.25);
      background.yFrame -= (background.moveSpeed * 0.6875);
      background.mapCounter++
    },

  moveMapFrameUpStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapUp = false;
    link.yMove = backgroundMap.height - link.spriteHeight;
    game.level += 1;
    allEnemies.forEach(function(baddy) {
      if (baddy !== moblin && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblin && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      };
    });
    if (link.life <= 3) {
      heart.show = true;
    };
    if (link.life <= 1 || game.level >= 10 && game.level % 5 === 0) {
      bigHeart.show = true;
    };
  },

  moveMapFrameDownStart: function() {
      link.yMove -= (background.moveSpeed * 1.25);
      background.yFrame += (background.moveSpeed * 0.6875);
      background.mapCounter++
    },

  moveMapFrameDownStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapDown = false;
    link.yMove = 0;
    game.level += 1;
    allEnemies.forEach(function(baddy) {
      if (baddy !== moblin && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblin && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      };
    });
    if (link.life <= 3) {
      heart.show = true;
    };
    if (link.life <= 1 || game.level >= 10 && game.level % 5 === 0) {
      bigHeart.show = true;
    };
  },

  moveMapFrameLeftStart: function() {
    link.xMove += (background.moveSpeed * 1.85);
    background.xFrame -= background.moveSpeed;
    background.mapCounter++
    },

  moveMapFrameLeftStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapLeft = false;
    link.xMove = backgroundMap.width - link.spriteWidth;
    game.level += 1;
    allEnemies.forEach(function(baddy) {
      if (baddy !== moblin && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblin && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      };
    });
    if (link.life <= 3) {
      heart.show = true;
    };
    if (link.life <= 1 || game.level >= 10 && game.level % 5 === 0) {
      bigHeart.show = true;
    };
  },

  moveMapFrameRightStart: function() {
    link.xMove -= (background.moveSpeed * 1.85);
    background.xFrame += background.moveSpeed;
    background.mapCounter++
  },

  moveMapFrameRightStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapRight = false;
    link.xMove = 0;
    game.level += 1;
    allEnemies.forEach(function(baddy) {
      if (baddy !== moblin && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblin && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      };
    });
    if (link.life <= 3) {
      heart.show = true;
    };
    if (link.life <= 1 || game.level >= 10 && game.level % 5 === 0) {
      bigHeart.show = true;
    };
  }
};


//Define character images
let explosionPng = new Image();
explosionPng.src = 'images/explosion-death.png';

let bossExplosionPng = new Image();
bossExplosionPng.src = 'images/boss-explosion.png';

let zeldaPng = new Image();
zeldaPng.src = 'images/zelda.png';


//All enemies array
let allEnemies = [tektite, keese, gibdo, stalfos, dodongo, armos, wizzrobe, darknut, aquamentus, moblin];

let liveEnemies = [];
let areEnemiesDead = null;


let startGameButton = $('#start-game');


//Animation Game Loop
let animateGame = null;

let animationLoop = function() {

  if (link.life <= 0) {
    game.over = true;
  };

  if (!game.over) {
    game.setGameNow();


    ctxEnemyMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
    ctxBackgroundMap.drawImage(background.image, background.xFrame, background.yFrame, background.pngWidth, background.pngHeight, 0, 0, background.mapWidth, background.mapHeight);

    //up map frame counter, call, and stop
    if (background.moveMapUp) {
      if (background.mapCounter < 64) {
        background.moveMapFrameUpStart();
      } else {
        background.moveMapFrameUpStop();
      };
    };

    //down map frame counter, call, and stop
    if (background.moveMapDown) {
      if (background.mapCounter < 64) {
        background.moveMapFrameDownStart();
      } else {
        background.moveMapFrameDownStop();
      };
    };

    //left map frame counter, call, and stop
    if (background.moveMapLeft) {
      if (background.mapCounter < 64) {
        background.moveMapFrameLeftStart();
      } else {
        background.moveMapFrameLeftStop();
      };
    };

    //right map frame counter, call, and stop
    if (background.moveMapRight) {
      if (background.mapCounter < 64) {
        background.moveMapFrameRightStart();
      } else {
        background.moveMapFrameRightStop();
      };
    };

    //Animates hearts
    if (heart.show) {
      ctxEnemyMap.drawImage(heart.image, heart.xFrame, heart.yFrame, heart.pngWidth, heart.pngHeight, heart.x, heart.y, heart.spriteWidth, heart.spriteHeight);
    };
    //Animates big hearts
    if (bigHeart.show) {
      ctxEnemyMap.drawImage(bigHeart.image, bigHeart.xFrame, bigHeart.yFrame, bigHeart.pngWidth, bigHeart.pngHeight, bigHeart.x, bigHeart.y, bigHeart.spriteWidth, bigHeart.spriteHeight);
    };
    //Animates tektites
    if (!tektite.dead && game.level >= tektite.levelShowUp) {
      ctxEnemyMap.drawImage(tektite.image, tektite.xFrame, tektite.yFrame, tektite.pngWidth, tektite.pngHeight, tektite.xMove, tektite.yMove, tektite.spriteWidth, tektite.spriteHeight);
      tektite.moveTektite();
    };

    //Animates keese
    if (!keese.dead && game.level >= keese.levelShowUp) {
      ctxEnemyMap.drawImage(keese.image, keese.xFrame, keese.yFrame, keese.pngWidth, keese.pngHeight, keese.xMove, keese.yMove, keese.spriteWidth, keese.spriteHeight);
      keese.moveKeese();
    };

    //Animates gibdo
    if (!gibdo.dead && game.level >= gibdo.levelShowUp) {
      ctxEnemyMap.drawImage(gibdo.image, gibdo.xFrame, gibdo.yFrame, gibdo.pngWidth, gibdo.pngHeight, gibdo.xMove, gibdo.yMove, gibdo.spriteWidth, gibdo.spriteHeight);
      gibdo.moveGibdo();
    };

    //Animates stalfos
    if (!stalfos.dead && game.level >= stalfos.levelShowUp) {
      ctxEnemyMap.drawImage(stalfos.image, stalfos.xFrame, stalfos.yFrame, stalfos.pngWidth, stalfos.pngHeight, stalfos.xMove, stalfos.yMove, stalfos.spriteWidth, stalfos.spriteHeight);
      stalfos.moveStalfos();
    };

    //Animates dodongo
    if (!dodongo.dead && game.level >= dodongo.levelShowUp && dodongo.xMove < 575) {
      ctxEnemyMap.drawImage(dodongo.image, dodongo.xFrame, dodongo.yFrame, dodongo.pngWidth, dodongo.pngHeight, dodongo.xMove, dodongo.yMove, dodongo.spriteWidth, dodongo.spriteHeight);
      dodongo.moveDodongo();
    };
    if (!dodongo.dead && game.level >= dodongo.levelShowUp && dodongo.xMove >= 575) {
      dodongo.dead = true;
      xRightResetOffscreenEnemies(dodongo);
    };

    //Animates armos
    if (!armos.dead && game.level >= armos.levelShowUp) {
      ctxEnemyMap.drawImage(armos.image, armos.xFrame, armos.yFrame, armos.pngWidth, armos.pngHeight, armos.xMove, armos.yMove, armos.spriteWidth, armos.spriteHeight);
      armos.moveArmos();
    };

    //Animates wizzrobe
    if (!wizzrobe.dead && game.level >= wizzrobe.levelShowUp) {
      ctxEnemyMap.drawImage(wizzrobe.image, wizzrobe.xFrame, wizzrobe.yFrame, wizzrobe.pngWidth, wizzrobe.pngHeight, wizzrobe.xMove, wizzrobe.yMove, wizzrobe.spriteWidth, wizzrobe.spriteHeight);
      wizzrobe.moveWizzrobe();
    };

    //Animates darknut
    if (!darknut.dead && game.level >= darknut.levelShowUp && darknut.yMove < 375) {
      ctxEnemyMap.drawImage(darknut.image, darknut.xFrame, darknut.yFrame, darknut.pngWidth, darknut.pngHeight, darknut.xMove, darknut.yMove, darknut.spriteWidth, darknut.spriteHeight);
      darknut.moveDarknut();
    };
    if (!darknut.dead && game.level >= darknut.levelShowUp && darknut.yMove >= 375) {
      darknut.dead = true;
      yResetOffscreenEnemies(darknut);
    };

    //Animates aquamentus
    if (!aquamentus.dead && game.level >= aquamentus.levelShowUp && aquamentus.xMove > -50) {
      ctxEnemyMap.drawImage(aquamentus.image, aquamentus.xFrame, aquamentus.yFrame, aquamentus.pngWidth, aquamentus.pngHeight, aquamentus.xMove, aquamentus.yMove, aquamentus.spriteWidth, aquamentus.spriteHeight);
      aquamentus.moveAquamentus();
    };
    if (!aquamentus.dead && game.level >= aquamentus.levelShowUp && aquamentus.xMove <= -50) {
      aquamentus.dead = true;
      xLeftResetOffscreenEnemies(aquamentus);
    };

    //Animates moblin
    if (!moblin.dead && game.level >= moblin.levelShowUp) {
      ctxEnemyMap.drawImage(moblin.image, moblin.xFrame, moblin.yFrame, moblin.pngWidth, moblin.pngHeight, moblin.xMove, moblin.yMove, moblin.spriteWidth, moblin.spriteHeight);
      moblin.moveMoblin();
    };

    //Animates link and explosion steps
    ctxSpriteMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);
    link.invincible = $('#invincible').prop('checked');

    if (link.isMovingUp) {
      link.moveUp();
    };
    if (link.isMovingDown) {
      link.moveDown();
    };
    if (link.isMovingLeft) {
      link.moveLeft();
    };
    if (link.isMovingRight) {
      link.moveRight();
    };

  //Collision checks
    //heart
    heartCollisionDetection(link.xMove, link.yMove, heart.x, heart.y, heart);
    //big heart
    heartCollisionDetection(link.xMove, link.yMove, bigHeart.x, bigHeart.y, bigHeart);
    //tektite
    enemyCollisionDetection(link.xMove, link.yMove, tektite.xMove, tektite.yMove, tektite);
    //keese
    enemyCollisionDetection(link.xMove, link.yMove, keese.xMove, keese.yMove, keese);
    //gibdo
    enemyCollisionDetection(link.xMove, link.yMove, gibdo.xMove, gibdo.yMove, gibdo);
    //stalfos
    enemyCollisionDetection(link.xMove, link.yMove, stalfos.xMove, stalfos.yMove, stalfos);
    //dodongo
    enemyCollisionDetection(link.xMove, link.yMove, dodongo.xMove, dodongo.yMove, dodongo);
    //armos
    enemyCollisionDetection(link.xMove, link.yMove, armos.xMove, armos.yMove, armos);
    //wizzrobe
    enemyCollisionDetection(link.xMove, link.yMove, wizzrobe.xMove, wizzrobe.yMove, wizzrobe);
    //darknut
    enemyCollisionDetection(link.xMove, link.yMove, darknut.xMove, darknut.yMove, darknut);
    //aquamentus
    enemyCollisionDetection(link.xMove, link.yMove, aquamentus.xMove, aquamentus.yMove, aquamentus);
    //moblin
    enemyCollisionDetection(link.xMove, link.yMove, moblin.xMove, moblin.yMove, moblin);


    //Array of live enemies
    liveEnemies = allEnemies.filter(function(baddy) {
      return baddy.dead === false;
    });
    //true if all enemies dead; false if enemies alive
    areEnemiesDead = function() {
      return liveEnemies.length > 0 ? false : true;
    };

    animateGame = requestAnimationFrame(animationLoop);

  } else if (game.over) {
    game.endTime = Date.now();
    gameOver();
  };

};


//replay and restart game
let startGame = function() {
  if (game.over) {
    allEnemies.forEach(function(baddy) {
      baddy.dead = true;
      baddy.life = 0;
    });
    tektite.dead = false;
    tektite.life = tektite.maxLife;
    tektite.xMove = xStarting(tektite.spriteWidth);
    tektite.yMove = yStarting(tektite.spriteHeight);
    dodongo.xMove = -100;
    dodongo.yMove = yStarting(50);
    heart.show = false;
    link.life = link.maxLife;
    link.heartDisplay();
    link.xMove = xStarting(32);
    link.yMove = yStarting(35);
    link.xFrame = 0;
    link.yFrame = 0;
    game.over = false;
    game.level = 1;
    background.xFrame = (Math.floor(Math.random() * 16)) * 256;
    background.yFrame = (Math.floor(Math.random() * 8)) * 176;
    deathCanvas.style.opacity = '0';
    ctxBackgroundMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxDeathCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxEnemyMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxSpriteMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    backgroundMap.classList.remove('canvas-blur');
    enemyMap.classList.remove('canvas-blur');
    animationLoop();
    $('#start-game').css('visibility', 'hidden');
  };
};

startGameButton.on('click', startGame);
window.addEventListener('keydown', link.playerAction);
window.addEventListener('keyup', link.actionStop);

export { game, background, areEnemiesDead, animateGame, zeldaPng, explosionPng, bossExplosionPng, startGameButton };