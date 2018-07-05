import { coinFlip, xStarting, yStarting } from './modules/mathHelpers.js';
import { newImage } from './modules/nonMathHelpers.js';
import { heart, bigHeart } from './modules/items/hearts.js';
import {
  Tektite,
  Keese,
  Gibdo,
  Stalfos,
  Dodongo,
  Armos,
  Wizzrobe,
  Darknut,
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
      link.y += (background.moveSpeed * 1.25);
      background.yFrame -= (background.moveSpeed * 0.6875);
      background.mapCounter++
    },

  moveMapFrameUpStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapUp = false;
    link.y = backgroundMap.height - link.spriteHeight;
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
      link.y -= (background.moveSpeed * 1.25);
      background.yFrame += (background.moveSpeed * 0.6875);
      background.mapCounter++
    },

  moveMapFrameDownStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapDown = false;
    link.y = 0;
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
    link.x += (background.moveSpeed * 1.85);
    background.xFrame -= background.moveSpeed;
    background.mapCounter++
    },

  moveMapFrameLeftStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapLeft = false;
    link.x = backgroundMap.width - link.spriteWidth;
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
    link.x -= (background.moveSpeed * 1.85);
    background.xFrame += background.moveSpeed;
    background.mapCounter++
  },

  moveMapFrameRightStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapRight = false;
    link.x = 0;
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

let tektiteInstance = new Tektite();
let keeseInstance = new Keese();
let gibdoInstance = new Gibdo();
let stalfosInstance = new Stalfos();
let dodongoInstance = new Dodongo();
let armosInstance = new Armos();
let wizzrobeInstance = new Wizzrobe();
let darknutInstance = new Darknut();
// let aquamentusInstance = new Aquamentus();
// let moblinInstance = new Moblin();


// let tektiteArray = [];
// for (let i = 0; i < 10; i++) {
//   tektiteArray.push(new Tektite());
// }

//All enemies array
// let allEnemies = [...tektiteArray, keese, gibdo, stalfos, dodongo, armos, wizzrobe, darknut, aquamentus, moblin];
let allEnemies = [
  tektiteInstance, keeseInstance, gibdoInstance, stalfosInstance, dodongoInstance,
  armosInstance, wizzrobeInstance, darknutInstance, aquamentus, moblin
];

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
    //Animates tektiteInstance
    if (!tektiteInstance.dead && game.level >= tektiteInstance.levelShowUp) {
      ctxEnemyMap.drawImage(tektiteInstance.image, tektiteInstance.xFrame, tektiteInstance.yFrame, tektiteInstance.pngWidth, tektiteInstance.pngHeight, tektiteInstance.x, tektiteInstance.y, tektiteInstance.spriteWidth, tektiteInstance.spriteHeight);
      tektiteInstance.move();
    };
    /////// for multiple tektites
    // for (let i = 0; i < tektiteArray.length; i++) {
    //   if (!tektiteArray[i].dead && game.level >= tektiteArray[i].levelShowUp) {
    //     tektiteArray[i].draw();
    //     tektiteArray[i].move();
    //   };
    // }
    ///////

    //Animates keeseInstance
    if (!keeseInstance.dead && game.level >= keeseInstance.levelShowUp) {
      ctxEnemyMap.drawImage(keeseInstance.image, keeseInstance.xFrame, keeseInstance.yFrame, keeseInstance.pngWidth, keeseInstance.pngHeight, keeseInstance.x, keeseInstance.y, keeseInstance.spriteWidth, keeseInstance.spriteHeight);
      keeseInstance.move();
    };

    //Animates gibdoInstance
    if (!gibdoInstance.dead && game.level >= gibdoInstance.levelShowUp) {
      ctxEnemyMap.drawImage(gibdoInstance.image, gibdoInstance.xFrame, gibdoInstance.yFrame, gibdoInstance.pngWidth, gibdoInstance.pngHeight, gibdoInstance.x, gibdoInstance.y, gibdoInstance.spriteWidth, gibdoInstance.spriteHeight);
      gibdoInstance.move();
    };

    //Animates stalfosInstance
    if (!stalfosInstance.dead && game.level >= stalfosInstance.levelShowUp) {
      ctxEnemyMap.drawImage(stalfosInstance.image, stalfosInstance.xFrame, stalfosInstance.yFrame, stalfosInstance.pngWidth, stalfosInstance.pngHeight, stalfosInstance.x, stalfosInstance.y, stalfosInstance.spriteWidth, stalfosInstance.spriteHeight);
      stalfosInstance.move();
    };

    //Animates dodongoInstance
    if (!dodongoInstance.dead && game.level >= dodongoInstance.levelShowUp && dodongoInstance.x < backgroundMap.width + dodongoInstance.spriteWidth) {
      ctxEnemyMap.drawImage(dodongoInstance.image, dodongoInstance.xFrame, dodongoInstance.yFrame, dodongoInstance.pngWidth, dodongoInstance.pngHeight, dodongoInstance.x, dodongoInstance.y, dodongoInstance.spriteWidth, dodongoInstance.spriteHeight);
      dodongoInstance.move();
    };
    if (!dodongoInstance.dead && game.level >= dodongoInstance.levelShowUp && dodongoInstance.x >= backgroundMap.width + dodongoInstance.spriteWidth) {
      dodongoInstance.dead = true;
      xRightResetOffscreenEnemies(dodongoInstance);
    };

    //Animates armosInstance
    if (!armosInstance.dead && game.level >= armosInstance.levelShowUp) {
      ctxEnemyMap.drawImage(armosInstance.image, armosInstance.xFrame, armosInstance.yFrame, armosInstance.pngWidth, armosInstance.pngHeight, armosInstance.x, armosInstance.y, armosInstance.spriteWidth, armosInstance.spriteHeight);
      armosInstance.move();
    };

    //Animates wizzrobeInstance
    if (!wizzrobeInstance.dead && game.level >= wizzrobeInstance.levelShowUp) {
      ctxEnemyMap.drawImage(wizzrobeInstance.image, wizzrobeInstance.xFrame, wizzrobeInstance.yFrame, wizzrobeInstance.pngWidth, wizzrobeInstance.pngHeight, wizzrobeInstance.x, wizzrobeInstance.y, wizzrobeInstance.spriteWidth, wizzrobeInstance.spriteHeight);
      wizzrobeInstance.move();
    };

    //Animates darknutInstance
    if (!darknutInstance.dead && game.level >= darknutInstance.levelShowUp && darknutInstance.y < backgroundMap.height + darknutInstance.spriteHeight) {
      ctxEnemyMap.drawImage(darknutInstance.image, darknutInstance.xFrame, darknutInstance.yFrame, darknutInstance.pngWidth, darknutInstance.pngHeight, darknutInstance.x, darknutInstance.y, darknutInstance.spriteWidth, darknutInstance.spriteHeight);
      darknutInstance.move();
    };
    if (!darknutInstance.dead && game.level >= darknutInstance.levelShowUp && darknutInstance.y >= backgroundMap.height + darknutInstance.spriteHeight) {
      darknutInstance.dead = true;
      yResetOffscreenEnemies(darknutInstance);
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
    ctxSpriteMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.x, link.y, link.spriteWidth, link.spriteHeight);
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
    heartCollisionDetection(link.x, link.y, heart.x, heart.y, heart);
    //big heart
    heartCollisionDetection(link.x, link.y, bigHeart.x, bigHeart.y, bigHeart);

    //tektiteInstance
    enemyCollisionDetection(link.x, link.y, tektiteInstance.x, tektiteInstance.y, tektiteInstance);

    ////// for multiple tektites
    // for (let i = 0; i < tektiteArray.length; i++) {
    //   enemyCollisionDetection(link.x, link.y, tektiteArray[i].x, tektiteArray[i].y, tektiteArray[i]);
    // }

    //keeseInstance
    enemyCollisionDetection(link.x, link.y, keeseInstance.x, keeseInstance.y, keeseInstance);
    //gibdoInstance
    enemyCollisionDetection(link.x, link.y, gibdoInstance.x, gibdoInstance.y, gibdoInstance);
    //stalfosInstance
    enemyCollisionDetection(link.x, link.y, stalfosInstance.x, stalfosInstance.y, stalfosInstance);
    //dodongoInstance
    enemyCollisionDetection(link.x, link.y, dodongoInstance.x, dodongoInstance.y, dodongoInstance);
    //armosInstance
    enemyCollisionDetection(link.x, link.y, armosInstance.x, armosInstance.y, armosInstance);
    //wizzrobeInstance
    enemyCollisionDetection(link.x, link.y, wizzrobeInstance.x, wizzrobeInstance.y, wizzrobeInstance);
    //darknutInstance
    enemyCollisionDetection(link.x, link.y, darknutInstance.x, darknutInstance.y, darknutInstance);
    //aquamentus
    enemyCollisionDetection(link.x, link.y, aquamentus.xMove, aquamentus.yMove, aquamentus);
    //moblin
    enemyCollisionDetection(link.x, link.y, moblin.xMove, moblin.yMove, moblin);


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
    tektiteInstance.dead = false;
    tektiteInstance.life = tektiteInstance.maxLife;
    tektiteInstance.x = xStarting(tektiteInstance.spriteWidth);
    tektiteInstance.y = yStarting(tektiteInstance.spriteHeight);
    // for multiple tektites
    // for (let i = 0; i < tektiteArray.length; i++) {
    //   tektiteArray[i].dead = false;
    //   tektiteArray[i].life = tektiteArray[i].maxLife;
    //   tektiteArray[i].x = xStarting(tektiteArray[i].spriteWidth);
    //   tektiteArray[i].y = yStarting(tektiteArray[i].spriteHeight);
    // }
    dodongoInstance.x = -100;
    dodongoInstance.y = yStarting(50);
    heart.show = false;
    link.life = link.maxLife;
    link.heartDisplay();
    link.x = xStarting(32);
    link.y = yStarting(35);
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
    animationLoop();
    $('#start-game').css('visibility', 'hidden');
  };
};

  //////////////////////////////////////////
 // Working example for a click on enemy //
//////////////////////////////////////////
// let testClick = (e, tek) => {
//   let sMap = document.getElementById('sprite-map');
//   console.log('testClick');
//   let x = e.clientX - sMap.offsetParent.offsetLeft - sMap.offsetLeft;
//   let y = e.clientY - sMap.offsetParent.offsetTop;
//   let tx = tek.xMove;
//   let ty = tek.yMove
//   console.log('x: ', x, 'y: ', y, 'tx: ', tx, 'ty : ', ty);
//   if (x >= tx && x <= tx + tek.spriteWidth && y >= ty && y <= ty + tek.spriteHeight) {
//     console.log('in testClick if');
//     sMap.style.backgroundColor = 'red';
//   }
// };
// document.getElementById('sprite-map').addEventListener('click', e => {
//   testClick(e, tektiteInstance);
// });

startGameButton.on('click', startGame);
window.addEventListener('keydown', link.playerAction);
window.addEventListener('keyup', link.actionStop);

export { game, background, areEnemiesDead, animateGame, startGameButton };
