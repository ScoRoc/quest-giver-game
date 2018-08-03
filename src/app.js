import { coinFlip, xStarting, yStarting } from './modules/mathHelpers.js';
import { newImage } from './modules/nonMathHelpers.js';
import { showHideQuests } from './modules/showHideQuests.js';
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
  Aquamentus,
  Moblin
} from './modules/enemyImporter.js';
import QuestGiver from './modules/npc/QuestGiver.js';
import {
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
  xFrame: (Math.floor(Math.random() * 16)) * 256,  //x axis start of current map frame (from src img)
  yFrame: (Math.floor(Math.random() * 8)) * 176,  //y axis start of current map frame (from src img)
  moveSpeed: 4,  //speed at which map moves frames
  mapCounter: 0,  //count map frame slides for map move function
  pngWidth: 256,  //map frame width from src img
  pngHeight: 176,  //map frame height from src img
  pngSourceWidth: 4096,  //width of source png
  pngSourceHeight: 1408,  //height of source png
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
      if (baddy !== moblinInstance && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblinInstance && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
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
      if (baddy !== moblinInstance && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblinInstance && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
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
      if (baddy !== moblinInstance && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblinInstance && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
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
      if (baddy !== moblinInstance && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblinInstance && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
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
let aquamentusInstance = new Aquamentus();
let moblinInstance = new Moblin();


  //////////////////////////////////////////
 // testing quest giver as colored block //
//////////////////////////////////////////
let questGiverInstance = new QuestGiver(150, 150, 50, 50, '#3FA');

let clickQuestGiver = e => {
  let sMap = document.getElementById('sprite-map');
  let x = e.clientX - sMap.offsetParent.offsetLeft - sMap.offsetLeft;
  let y = e.clientY - sMap.offsetParent.offsetTop;
  let qg = questGiverInstance;
  if (x >= qg.x && x <= qg.x + qg.width && y >= qg.y && y <= qg.y + qg.height) {
    qg.click();
  }
};
///////////////////////////////////


// let tektiteArray = [];
// for (let i = 0; i < 10; i++) {
//   tektiteArray.push(new Tektite());
// }

//All enemies array
// let allEnemies = [...tektiteArray, keese, gibdo, stalfos, dodongo, armos, wizzrobe, darknut, aquamentus, moblin];
let allEnemies = [
  tektiteInstance, keeseInstance, gibdoInstance, stalfosInstance, dodongoInstance,
  armosInstance, wizzrobeInstance, darknutInstance, aquamentusInstance, moblinInstance
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
    ctxBackgroundMapDraw(background);

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


      ///////////////////////////////////
     //  testing drawing quest giver  //
    ///////////////////////////////////
    ctxSpriteMap.fillStyle = questGiverInstance.color;
    ctxSpriteMap.fillRect(questGiverInstance.x, questGiverInstance.y, questGiverInstance.width, questGiverInstance.height);
    ///////////////////////////////////


    //Animates hearts
    if (heart.show) {
      ctxEnemyMapDraw(heart);
    };
    //Animates big hearts
    if (bigHeart.show) {
      ctxEnemyMapDraw(bigHeart);
    };
    //Animates tektiteInstance
    if (!tektiteInstance.dead && game.level >= tektiteInstance.levelShowUp) {
      ctxEnemyMapDraw(tektiteInstance)
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
      ctxEnemyMapDraw(keeseInstance);
      keeseInstance.move();
    };

    //Animates gibdoInstance
    if (!gibdoInstance.dead && game.level >= gibdoInstance.levelShowUp) {
      ctxEnemyMapDraw(gibdoInstance);
      gibdoInstance.move();
    };

    //Animates stalfosInstance
    if (!stalfosInstance.dead && game.level >= stalfosInstance.levelShowUp) {
      ctxEnemyMapDraw(stalfosInstance);
      stalfosInstance.move();
    };

    //Animates dodongoInstance
    if (!dodongoInstance.dead && game.level >= dodongoInstance.levelShowUp && dodongoInstance.x < backgroundMap.width + dodongoInstance.spriteWidth) {
      ctxEnemyMapDraw(dodongoInstance);
      dodongoInstance.move();
    };
    if (!dodongoInstance.dead && game.level >= dodongoInstance.levelShowUp && dodongoInstance.x >= backgroundMap.width + dodongoInstance.spriteWidth) {
      dodongoInstance.dead = true;
      xRightResetOffscreenEnemies(dodongoInstance);
    };

    //Animates armosInstance
    if (!armosInstance.dead && game.level >= armosInstance.levelShowUp) {
      ctxEnemyMapDraw(armosInstance);
      armosInstance.move();
    };

    //Animates wizzrobeInstance
    if (!wizzrobeInstance.dead && game.level >= wizzrobeInstance.levelShowUp) {
      ctxEnemyMapDraw(wizzrobeInstance);
      wizzrobeInstance.move();
    };

    //Animates darknutInstance
    if (!darknutInstance.dead && game.level >= darknutInstance.levelShowUp && darknutInstance.y < backgroundMap.height + darknutInstance.spriteHeight) {
      ctxEnemyMapDraw(darknutInstance);
      darknutInstance.move();
    };
    if (!darknutInstance.dead && game.level >= darknutInstance.levelShowUp && darknutInstance.y >= backgroundMap.height + darknutInstance.spriteHeight) {
      darknutInstance.dead = true;
      yResetOffscreenEnemies(darknutInstance);
    };

    //Animates aquamentusInstance
    if (!aquamentusInstance.dead && game.level >= aquamentusInstance.levelShowUp && aquamentusInstance.x > -aquamentusInstance.spriteWidth) {
      ctxEnemyMapDraw(aquamentusInstance);
      aquamentusInstance.move();
    };
    if (!aquamentusInstance.dead && game.level >= aquamentusInstance.levelShowUp && aquamentusInstance.x <= -aquamentusInstance.spriteWidth) {
      aquamentusInstance.dead = true;
      xLeftResetOffscreenEnemies(aquamentusInstance);
    };

    //Animates moblinInstance
    if (!moblinInstance.dead && game.level >= moblinInstance.levelShowUp) {
      ctxEnemyMapDraw(moblinInstance);
      moblinInstance.move();
    };

    //Animates link and explosion steps
    ctxSpriteMapDraw(link);
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
    heartCollisionDetection(link, heart);
    //big heart
    heartCollisionDetection(link, bigHeart);

    //tektiteInstance
    enemyCollisionDetection(link, tektiteInstance);

    ////// for multiple tektites
    // for (let i = 0; i < tektiteArray.length; i++) {
    //   enemyCollisionDetection(link.x, link.y, tektiteArray[i].x, tektiteArray[i].y, tektiteArray[i]);
    // }

    //keeseInstance
    enemyCollisionDetection(link, keeseInstance);
    //gibdoInstance
    enemyCollisionDetection(link, gibdoInstance);
    //stalfosInstance
    enemyCollisionDetection(link, stalfosInstance);
    //dodongoInstance
    enemyCollisionDetection(link, dodongoInstance);
    //armosInstance
    enemyCollisionDetection(link, armosInstance);
    //wizzrobeInstance
    enemyCollisionDetection(link, wizzrobeInstance);
    //darknutInstance
    enemyCollisionDetection(link, darknutInstance);
    //aquamentusInstance
    enemyCollisionDetection(link, aquamentusInstance);
    //moblinInstance
    enemyCollisionDetection(link, moblinInstance);


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
    dodongoInstance.x = -dodongoInstance.spriteWidth * 1.2;
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

$('#quests-div button').click(() => showHideQuests.showHide());

document.getElementById('sprite-map').addEventListener('click', e => clickQuestGiver(e));

startGameButton.on('click', startGame);
window.addEventListener('keydown', link.playerAction);
window.addEventListener('keyup', link.actionStop);


let top = document.getElementById('topspace');

top.addEventListener('bar', (e) => {
  console.log(e.detail);
});

top.dispatchEvent(new CustomEvent('bar', {
  bubble: true,
  detail: 'foo'
}));



export { game, background, areEnemiesDead, animateGame, startGameButton };
