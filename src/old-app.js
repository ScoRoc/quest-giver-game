import { coinFlip, xStarting, yStarting, xMapStart, yMapStart } from './modules/mathHelpers.js';
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
import { backgroundMap, ctxBackgroundMap } from './modules/maps.js';
import link from './modules/player.js';


//Game info and functions
let game = {
  win: false,  //tracks if won game
  over: true,  //tracks game over or not
  continuous: false,  //tracks continous or boss mode
  score: 0,  //tracks current kill score
  highScore: 0,  //tracks high score
  level: 1,  //which level player is on
  needToKill: 1,  //tracks how many enemies link needs to kill to progress
  now: null,  //current game time
  endTime: null,  //tracks game end time
  // delta: null,  //change in now and then game time, ie frame rate
  // then: null,  ////previous game time (last frame)

  setGameNow: function() {  //sets game time
    game.now = Date.now();
  }

};


//Defining backgroundMap canvas
let backgroundImage = new Image();
backgroundImage.src = 'images/overworld_map.png';

let backgroundWinImage = new Image();
backgroundWinImage.src = 'images/castle.png';

let background = {
  image: backgroundImage,
  winImage: backgroundWinImage,
  xFrame: xMapStart(),  //x axis start of current map frame (from src img)
  yFrame: yMapStart(),  //y axis start of current map frame (from src img)
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


//Defining sprite and enemy map canvas'
let explosionCanvas = document.getElementById('explosion-canvas');
let ctxExplosionCanvas = explosionCanvas.getContext('2d');
explosionCanvas.width = 512;
explosionCanvas.height = 352;

let enemyMap = document.getElementById('enemy-map');
let ctxEnemyMap = enemyMap.getContext('2d');
enemyMap.width = 512;
enemyMap.height = 352;

let deathCanvas = document.getElementById('death-canvas');
let ctxDeathCanvas = deathCanvas.getContext('2d');
deathCanvas.width = 512;
deathCanvas.height = 352;

let spriteMap = document.getElementById('sprite-map');
let ctxSpriteMap = spriteMap.getContext('2d');
spriteMap.width = 512;
spriteMap.height = 352;

let winCanvas = document.getElementById('win-canvas');
let ctxWinCanvas = winCanvas.getContext('2d');
winCanvas.width = 512;
winCanvas.height = 352;


//Define character images
let explosionPng = new Image();
explosionPng.src = 'images/explosion-death.png';

let bossExplosionPng = new Image();
bossExplosionPng.src = 'images/boss-explosion.png';

let linkPng = new Image();
linkPng.src = 'images/link-spritesheet.png';

let zeldaPng = new Image();
zeldaPng.src = 'images/zelda.png';



//rest xRightRunner offscreen enemies
let xRightResetOffscreenEnemies = function (enemy) {
  enemy.xMove = -100;
  enemy.yMove = yStarting(enemy.spriteHeight);
};

//rest xLeftRunner offscreen enemies
let xLeftResetOffscreenEnemies = function (enemy) {
  enemy.xMove = 555;
  enemy.yMove = yStarting(enemy.spriteHeight);
};

//rest y offscreen enemies
let yResetOffscreenEnemies = function (enemy) {
  enemy.xMove = xStarting(enemy.spriteWidth);
  enemy.yMove = -60;
};


//All enemies array
let allEnemies = [tektite, keese, gibdo, stalfos, dodongo, armos, wizzrobe, darknut, aquamentus, moblin];

let liveEnemies = [];
let areEnemiesDead = null;

//Collision Detection between Link and enemies
let enemyCollisionDetection = function(x1, y1, x2, y2, enemy) {
  if (!link.isAttacking && ((game.now - link.hitTime) / 1000) > 1.25 && enemy.life > 0) {
    let xDistance = x2 - x1;
    let yDistance = y2 - (y1 - 4);
    let hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    if (hitRadius <= 33 && !link.invincible) {
      link.linkHit();
      link.life -= enemy.strength;
      link.heartDisplay();
    };
  } else if (link.isAttacking && ((game.now - link.attackTime) / 1000) > .2 && enemy.life > 0) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    let hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    let xRightAttack = x1 + 20;
    let xDistanceRight = x2 - xRightAttack;
    let hitRadiusRight = Math.abs(Math.sqrt(Math.pow(xDistanceRight, 2) + Math.pow(yDistance, 2)));
    let yDownAttack = y1 + 18;
    let yDistanceDown = y2 - yDownAttack;
    let hitRadiusDown = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistanceDown, 2)));
    if (hitRadius <= 32 || hitRadiusRight <= 32 || hitRadiusDown <= 32) {
      link.linkAttack();
      enemy.life -= 1;
      if (enemy.life === 0) {
        enemy.dead = true;
      };
      if (enemy.dead) {
        if (enemy.type !== 'boss') {
          ctxExplosionCanvas.drawImage(explosionPng, 40, 10, 280, 285, enemy.xMove, enemy.yMove, 60, 60);
        } else if (enemy.type === 'boss') {
          ctxExplosionCanvas.drawImage(bossExplosionPng, 0, 0, 958, 952, moblin.xMove, moblin.yMove, 80, 80);
        };
        if (enemy.type !== 'xRightRunner' && enemy.type !== 'xLeftRunner' && enemy.type !== 'yRunner') {
          enemy.xMove = xStarting(enemy.spriteWidth);
          enemy.yMove = yStarting(enemy.spriteHeight);
        } else if (enemy.type === 'xRightRunner') {
          xRightResetOffscreenEnemies(enemy);
        } else if (enemy.type === 'xLeftRunner') {
          xLeftResetOffscreenEnemies(enemy);
        } else if (enemy.type === 'yRunner') {
          yResetOffscreenEnemies(enemy);
        };
        game.score += enemy.points;
      };
    };
  };
};


//Collision detection between Link and objects
let heartCollisionDetection = function(x1, y1, x2, y2, object) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  let crashZone = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  if (crashZone <= 30 && link.life <= 3.5 && object.show === true) {
    object.show = false;
    if (object === bigHeart) {
      object.x = xStarting(object.spriteWidth);
      object.y = yStarting(object.spriteHeight);
      if (link.life <= 3.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life = link.maxLife;
        $('#heart-one').removeClass('damaged');
        $('#heart-one').removeClass('heart-hidden');
        $('#heart-one').addClass('heart-show');
        $('#heart-two').removeClass('damaged');
        $('#heart-two').removeClass('heart-hidden');
        $('#heart-two').addClass('heart-show');
        $('#heart-three').removeClass('damaged');
        $('#heart-three').removeClass('heart-hidden');
        $('#heart-three').addClass('heart-show');
        $('#heart-four').removeClass('damaged');
      } else if (link.life === 3.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life = link.maxLife;
        $('#heart-four').removeClass('damaged');
      };
    } else if (object === heart) {
      object.x = xStarting(object.spriteWidth);
      object.y = yStarting(object.spriteHeight);
      if (link.life === 0.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-four').removeClass('damaged');
        $('#heart-three').removeClass('heart-hidden');
        $('#heart-three').addClass('heart-show');
      } else if (link.life === 1 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-three').removeClass('heart-hidden');
        $('#heart-three').removeClass('damaged');
        $('#heart-three').addClass('heart-show');
      } else if (link.life === 1.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-three').removeClass('damaged');
        $('#heart-two').removeClass('heart-hidden');
        $('#heart-two').addClass('heart-show');
      } else if (link.life === 2 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-two').removeClass('heart-hidden');
        $('#heart-two').removeClass('damaged');
        $('#heart-two').addClass('heart-show');
      } else if (link.life === 2.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-two').removeClass('damaged');
        $('#heart-one').removeClass('heart-hidden');
        $('#heart-one').addClass('heart-show');
      } else if (link.life === 3 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-one').removeClass('heart-hidden');
        $('#heart-one').removeClass('damaged');
        $('#heart-one').addClass('heart-show');
      } else if (link.life === 3.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 0.5;
        $('#heart-one').removeClass('damaged');
      };
    };
  };
};


let startGameButton = $('#start-game');


//Game over functions
  //link death spin
let linkDies = function() {
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);
  if (link.xFrame === 0 && link.yFrame === 0) {
    link.xFrame = 90;
    link.yFrame = 30;
  } else if (link.xFrame === 90 && link.yFrame === 30) {
    link.xFrame = 61;
    link.yFrame = 0;
  } else if (link.xFrame === 61 && link.yFrame === 0) {
    link.xFrame = 29;
    link.yFrame = 0;
  } else if (link.xFrame === 29 && link.yFrame === 0) {
    link.xFrame = 0;
    link.yFrame = 0;
  };
};

//game over screen with replay button
let gameOverScreen = function() {
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = '#afd433';
  ctxSpriteMap.textAlign = 'center';
  ctxSpriteMap.fillText('Game Over', 259, 180);  //game over text
};

//game over function and link explosion
let gameOver = function() {
  cancelAnimationFrame(animateGame);
  ctxEnemyMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  deathCanvas.style.opacity = '0.56';
  link.xFrame = 0;
  link.yFrame = 0;
  let animateLinkDeath = setInterval(linkDies, .5);
  setTimeout(function() {
    clearInterval(animateLinkDeath);
    ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
    ctxSpriteMap.drawImage(explosionPng, 40, 10, 280, 285, link.xMove, link.yMove, 60, 60);
    setTimeout(function() {
      gameOverScreen();
      startGameButton.html('Replay game');
      startGameButton.css('visibility', 'visible');
    }, 1000);
  }, 2000);
};


//win game function
let winGame = function () {
  cancelAnimationFrame(animateGame);
  ctxBackgroundMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxEnemyMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);

  ctxBackgroundMap.drawImage(background.winImage, 0, 0, 1920, 1080, 0, 0, background.mapWidth, background.mapHeight);
  ctxSpriteMap.drawImage(link.image, 90, 30, link.pngWidth, link.pngHeight, 165, 200, 71.25, 76);
  ctxSpriteMap.drawImage(zeldaPng, 0, 0, 14, 16, 295, 200, 66.5, 76);

  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillText('Oh, you won?', 20, 40);

  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillText('That\'s neat I guess.', 20, 70);

  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillText('Want a sandwich?', 20, 320);

  startGameButton.html('Replay game');
  startGameButton.css('visibility', 'visible');
};


//Animation Game Loop
let animateGame = null;

let animationLoop = function() {

  if (link.life <= 0) {
    game.over = true;
  };

  game.continuous = $('#continuous-play').prop('checked');


  if (!game.continuous && game.level >= 10 && moblin.life <= 0) {
    game.win = true;
  };

  if (!game.over && !game.win) {
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


  //Updates score, high score, level, and kills to advance
    if (game.score > game.highScore) {
      game.highScore = game.score;
      localStorage.highScore = game.highScore;
    };
    $('#game-num').html(game.level);
    $('#score-num').html(game.score);
    $('#high-score').html(game.highScore);

    animateGame = requestAnimationFrame(animationLoop);

  } else if (game.over) {
    game.endTime = Date.now();
    gameOver();
  } else if (game.win) {
    ctxEnemyMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    setTimeout(winGame, 1500);
  };

};


//replay and restart game
let startGame = function() {
  if (game.over || game.win) {
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
    game.win = false;
    game.over = false;
    game.level = 1;
    game.score = 0;
    background.xFrame = xMapStart();
    background.yFrame = yMapStart();
    deathCanvas.style.opacity = '0';
    ctxBackgroundMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxDeathCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxWinCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxEnemyMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxSpriteMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    backgroundMap.classList.remove('canvas-blur');
    enemyMap.classList.remove('canvas-blur');
    cancelAnimationFrame(titleScreen);
    clearInterval(randomizeTitle);
    animationLoop();
    $('#start-game').css('visibility', 'hidden');
  };
};

let randomizeTitle = setInterval(function() {
    background.xFrame = xMapStart();
    background.yFrame = yMapStart();
    tektite.xMove = xStarting(tektite.spriteWidth);
    tektite.yMove = yStarting(tektite.spriteHeight);
    keese.xMove = xStarting(keese.spriteWidth);
    keese.yMove = yStarting(keese.spriteHeight);
    gibdo.xMove = xStarting(gibdo.spriteWidth);
    gibdo.yMove = yStarting(gibdo.spriteHeight);
    stalfos.xMove = xStarting(stalfos.spriteWidth);
    stalfos.yMove = yStarting(stalfos.spriteHeight);

  }, 4000);

//title screen
let titleScreen = null;
let titleScreenLoop = function () {
  ctxBackgroundMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
  ctxEnemyMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
  ctxBackgroundMap.drawImage(background.image, background.xFrame, background.yFrame, background.pngWidth, background.pngHeight, 0, 0, background.mapWidth, background.mapHeight);

  ctxSpriteMap.fillStyle = '#36c792';
  ctxSpriteMap.fillRect(95, 145, 327, 28);
  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = '#362934';
  ctxSpriteMap.fillText('Press Start Game', 100, 170);

  ctxEnemyMap.drawImage(tektite.image, tektite.xFrame, tektite.yFrame, tektite.pngWidth, tektite.pngHeight, tektite.xMove, tektite.yMove, tektite.spriteWidth, tektite.spriteHeight);
  ctxEnemyMap.drawImage(keese.image, keese.xFrame, keese.yFrame, keese.pngWidth, keese.pngHeight, keese.xMove, keese.yMove, keese.spriteWidth, keese.spriteHeight);
  ctxEnemyMap.drawImage(gibdo.image, gibdo.xFrame, gibdo.yFrame, gibdo.pngWidth, gibdo.pngHeight, gibdo.xMove, gibdo.yMove, gibdo.spriteWidth, gibdo.spriteHeight);
  ctxEnemyMap.drawImage(stalfos.image, stalfos.xFrame, stalfos.yFrame, stalfos.pngWidth, stalfos.pngHeight, stalfos.xMove, stalfos.yMove, stalfos.spriteWidth, stalfos.spriteHeight);
  ctxEnemyMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);

  tektite.moveTektite();
  keese.moveKeese();
  gibdo.moveGibdo();
  stalfos.moveStalfos();

  if (coinFlip(2) === 0) {
    if (link.xMove - stalfos.xMove >= 0) {
      link.xMove -= 1;
    } else if (link.xMove - stalfos.xMove < 0) {
      link.xMove += 1;
    }
  } else if (coinFlip(2) === 1) {
    if (link.yMove - stalfos.yMove >= 0) {
      link.yMove -= 1;
    } else if (link.yMove - stalfos.yMove < 0) {
      link.yMove += 1;
    };
  };

  titleScreen = requestAnimationFrame(titleScreenLoop);
};

//Load high score
let getHighScore = function() {
  if(localStorage.hasOwnProperty('highScore')) {
    game.highScore = localStorage.highScore;
  };
};

//Document ready function for DOM events
document.addEventListener('DOMContentLoaded', function(event) {
  titleScreenLoop();
  getHighScore();
  $('#high-score').text(game.highScore);
  startGameButton.on('click', startGame);
  window.addEventListener('keydown', link.playerAction);
  window.addEventListener('keyup', link.actionStop);

});

import testoo from './modules/player.js';
console.log('testoo on old-app.js', testoo);

let tester = 'here is tester';
export { link, backgroundMap, tester };
