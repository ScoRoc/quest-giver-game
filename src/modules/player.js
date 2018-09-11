import { updateHeartDisplay } from './items/hearts.js';
import { xStarting, yStarting } from './mathHelpers.js';
import { newImage } from './nonMathHelpers.js';
import { checkForDead, updateLastEnemy, updateDebuff } from './battle/battleFunctions.js';
import { backgroundMap } from './maps.js';
import { game, background, areEnemiesDead } from '../app.js';
import { ctxExplosionCanvas, enemyMap } from './maps.js';
import { FireDoT, allFireDoTs } from './battle/fireDoT.js';

//Starting player stats
const startingPlayerStats = {
  image: newImage('images/link-spritesheet.png'),
  xFrame: 0,
  yFrame: 0,
  pngWidth: 15,
  pngHeight: 16,
  spriteWidth: 31.875,
  spriteHeight: 34,
  bottomBound: backgroundMap.height - 35,
  rightBound: backgroundMap.width - 33,
  x: xStarting(32),
  y: yStarting(35),
  speed: 10,
  life: 4,
  maxLife: 4,
  level: 1,
  xpToLevel: 30
};

//Define player
//Player, aka Link
class Player {
  constructor(stats) {
    this.image = stats.image;  //src image
    this.xFrame = stats.xFrame;  //x starting point of src img for sprite frame
    this.yFrame = stats.yFrame;  //y starting point of src img for sprite frame
    this.upFrame = 0;  //placeholder for frame iteration
    this.downFrame = 0;  //placeholder for frame iteration
    this.leftFrame = 0;  //placeholder for frame iteration
    this.rightFrame = 0;  //placeholder for frame iteration
    this.pngWidth = stats.pngWidth;  //width of src img sprite size
    this.pngHeight = stats.pngHeight;  //height of src img sprite size
    this.spriteWidth = stats.spriteWidth;  //width of sprite on canvas
    this.spriteHeight = stats.spriteHeight;  //height of sprite on canvas
    this.bottomBound = stats.bottomBound;
    this.rightBound = stats.rightBound;
    this.x = stats.x;  //x point of link on canvas
    this.y = stats.y;  //y point of link on canvas
    this.frameSpeed = 14;  //number to calculate frame switch rate
    this.moveUpAnimation = null;  //function for down movement
    this.moveDownAnimation = null;  //function for up movement
    this.moveLeftAnimation = null;  //function for left movement
    this.moveRightAnimation = null;  //function for right movement
    this.upMapMove = 0; //y px where link causes map to move up
    this.downMapMove = backgroundMap.height - 34; //y px where link causes map to move down
    this.leftMapMove = 0; //x px where link causes map to move left
    this.rightMapMove = backgroundMap.width - 32; //x px where link causes map to move right
    this.speed = stats.speed;  //number of px moved per interval
    this.isMoving = false; //tracks to see if moving
    this.isAttacking = false; //tracks to see if attacking
    this.attackTime = null;  //tracks time link attacked
    this.hitTime = null;  //tracks time link was hit
    this.heartTime = null;  //tracks time when link picked up heart
    this.life = stats.life;  //how much life left
    this.maxLife = stats.maxLife;  //max life
    this.invincible = false;  //checks for invincibility
    this.level = stats.level;  //player level
    this.xp = 0;  //current player experience
    this.xpToLevel = stats.xpToLevel;  //xp needed for next level
    this.quests = [];  //array of current quests
    this.lastAttacked = null;  //tracks last enemy attacked
  };

  getAttackTime() {
    this.attackTime = Date.now();
  };

  getDamagedTime() {
    this.hitTime = Date.now();
  };

  getHeartTime() {
    this.heartTime = Date.now();
  };

  gainLevel() {
    this.level += 1;
    $('#player-lvl').text(this.level);
    this.xp = Math.abs(this.xpToLevel - this.xp);
    this.xpToLevel += 5;
    $('#needed-xp').text(this.xpToLevel);
    this.life = this.maxLife;
    updateHeartDisplay(this);
  };

  checkForNextLevel() {
    if (this.xpToLevel - this.xp <= 0) {
      this.gainLevel();
    }
  };

  gainXP(points) {
    this.xp += points;
    this.checkForNextLevel();
    $('#player-xp').text(this.xp);
  };

  moveUp() {
    // console.log('OUTER: ', this.y);
    if (this.y <= this.upMapMove && background.yFrame > 0) {
      background.mapMoving = true;
      background.moveMapUp = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && this.y >= 0) {
      // console.log('INNER: ', this.y);
      this.y -= this.speed;
      /////////// ADDED THIS TO FIX CLIPPING ISSUE
      if (this.y < 0) {
        this.y = -1
      }
      this.xFrame = 61;
      this.yFrame = 0;
      if (this.upFrame < (this.frameSpeed / 2)) {
        this.yFrame = 30;
        this.upFrame++;
      } else if(this.upFrame <= this.frameSpeed) {
        this.yFrame = 0;
        this.upFrame++;
      } else {
        this.upFrame = 0;
      }
    }
  };

  moveDown() {
    // if (this.y >= this.downMapMove && background.yFrame < background.pngSourceHeight - background.pngHeight && areEnemiesDead()) {
    if (this.y >= this.downMapMove && background.yFrame < background.pngSourceHeight - background.pngHeight) {
      background.mapMoving = true;
      background.moveMapDown = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && this.y <= this.bottomBound) {
      this.y += this.speed;
      /////////// ADDED THIS TO FIX CLIPPING ISSUE
      if (this.y > backgroundMap.height - this.spriteHeight) {
        this.y = backgroundMap.height - this.spriteHeight;
      }
      this.xFrame = 0;
      this.yFrame = 0;
      if (this.downFrame < (this.frameSpeed / 2)) {
        this.yFrame = 30;
        this.downFrame++;
      } else if(this.downFrame <= this.frameSpeed) {
        this.yFrame = 0;
        this.downFrame++;
      } else {
        this.downFrame = 0;
      }
    }
  };

  moveLeft() {
    // if (this.x <= this.leftMapMove && background.xFrame > 0 && areEnemiesDead()) {
    if (this.x <= this.leftMapMove && background.xFrame > 0) {
      background.mapMoving = true;
      background.moveMapLeft = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && this.x >= 0) {
      this.x -= this.speed;
      this.xFrame = 29;
      this.yFrame = 30;
      if (this.leftFrame < (this.frameSpeed * .5)) {
        this.yFrame = 0;
        this.leftFrame++;
      } else if(this.leftFrame <= this.frameSpeed) {
        this.yFrame = 30;
        this.leftFrame++;
      } else {
        this.leftFrame = 0;
      }
    }
  };

  moveRight() {
    // if (this.x >= this.rightMapMove && background.xFrame < background.pngSourceWidth - background.pngWidth && areEnemiesDead()) {
    if (this.x >= this.rightMapMove && background.xFrame < background.pngSourceWidth - background.pngWidth) {
      background.mapMoving = true;
      background.moveMapRight = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && this.x <= this.rightBound) {
      this.x += this.speed;
      this.xFrame = 90;
      this.yFrame = 0;
      if (this.rightFrame < (this.frameSpeed / 2)) {
        this.yFrame = 30;
        this.rightFrame++;
      } else if(this.rightFrame <= this.frameSpeed) {
        this.yFrame = 0;
        this.rightFrame++;
      } else {
        this.rightFrame = 0;
      }
    }
  };

  move() {
    switch(this.isMoving) {
      case 'up':
        this.moveUp();
        break;
      case 'down':
        this.moveDown();
        break;
      case 'left':
        this.moveLeft();
        break;
      case 'right':
        this.moveRight();
        break;
    }
  };

  fireDoT() {
    if (this.lastAttacked) {
      let fire = new FireDoT();
      fire.isOnEnemy = this.lastAttacked;
      if (!this.lastAttacked.dead) {
        fire.isAttacking = true;
        allFireDoTs.push(fire);
        updateDebuff(fire);
      }
      let dot = setInterval(() => {
        if (!this.lastAttacked.dead) {
          this.lastAttacked.life -= 0.5;
          updateLastEnemy(this, this.lastAttacked);
          checkForDead(this.lastAttacked);
        }
        if (this.lastAttacked.dead) {
          allFireDoTs.splice(allFireDoTs.indexOf(fire));
        }
      }, 1000);
      setTimeout(() => {
        clearInterval(dot);
        fire.isAttacking = false;
        allFireDoTs.splice(allFireDoTs.indexOf(fire));
        updateDebuff(fire);
      }, 3000)
    }
  };

  attackDirection() {
    switch(true) {
      //if facing up
      case this.xFrame === 61:
        this.xFrame = 60;
        this.pngHeight = 28;
        this.spriteHeight = 59.5;
        this.yFrame = 84;
        this.y -= 29;
        this.isMoving = false;
        this.isAttacking = true;
        break;
        //if facing down
      case this.xFrame === 0:
        this.pngWidth = 16;
        this.pngHeight = 28;
        this.spriteHeight = 59.5;
        this.yFrame = 84;
        this.y += 3;
        this.isMoving = false;
        this.isAttacking = true;
        break;
        //if facing left
      case this.xFrame === 29:
        this.xFrame = 24;
        this.pngWidth = 28;
        this.spriteWidth = 59.5;
        this.yFrame = 90;
        this.x -= 30;
        this.isMoving = false;
        this.isAttacking = true;
        break;
        //if facing right
      case this.xFrame === 90:
        this.xFrame = 84;
        this.pngWidth = 28;
        this.spriteWidth = 59.5;
        this.yFrame = 90;
        this.x += 6;
        this.isMoving = false;
        this.isAttacking = true;
        break;
    }
  };

  //Player keyboard actions
  playerAction(e) {
    let key = e.key || e.keycode;
    let keys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      ' ',
      'f',
      32, 37, 38, 39, 40, 70
    ];
    if (keys.includes(key)) {
      e.preventDefault();
    }
    //Up
    if (key === 'ArrowUp' || key === 38 && !game.over) {
      if (this.isMoving !== 'up' && !this.isAttacking && this.y >= 1) {
        this.isMoving = 'up';
      };
    }
    //Down
    if (key === 'ArrowDown' || key === 40 && !game.over) {
      if (this.isMoving !== 'down' && !this.isAttacking && this.y <= this.bottomBound) {
        this.isMoving = 'down';
      };
    }
    //Left
    if (key === 'ArrowLeft' || key ===  37 && !game.over) {
      if (this.isMoving !== 'left' && !this.isAttacking && this.x >= 0) {
        this.isMoving = 'left';
      };
    }
    //Right
    if (key === 'ArrowRight' || key ===  39 && !game.over) {
      if (this.isMoving !== 'right' && !this.isAttacking && this.x <= this.rightBound) {
        this.isMoving = 'right';
      };
    }
    //Spacebar
    if (key === ' ' || key ===  32 && !game.over) {
      this.attackDirection();
      console.log('heres last attacked: ', this.lastAttacked);
    }
    if (key === 'f' || key === 70 && !game.over) {
      this.fireDoT();
    }
  };

  attackDirectionStop() {
    switch(true) {
      //if facing up
      case this.xFrame === 60:
        this.xFrame = 61;
        this.pngHeight = 16;
        this.spriteHeight = 34;
        this.yFrame = 30;
        this.y += 29;
        this.isAttacking = false;
        break;
        //if facing down
      case this.xFrame === 0:
        this.pngWidth = 15;
        this.pngHeight = 16;
        this.spriteHeight = 34;
        this.yFrame = 0;
        this.y -= 3;
        this.isAttacking = false;
        break;
        //if facing left
      case this.xFrame === 24:
        this.xFrame = 29;
        this.pngWidth = 15;
        this.spriteWidth = 31.875;
        this.yFrame = 0;
        this.x += 30;
        this.isAttacking = false;
        break;
        this.yFrame = 100;
        //if facing right
      case this.xFrame === 84:
        this.xFrame = 90;
        this.pngWidth = 15;
        this.spriteWidth = 31.875;
        this.yFrame = 31;
        this.x -= 6;
        this.isAttacking = false;
        break;
    }
  };

  actionStop(e) {
    let key = e.key || e.keycode;
    //Stop moving up
    if(key === 'ArrowUp' || key === 38 && !game.over) {
      this.isMoving = false;
      this.yFrame = 30;
    };
    //Stop moving down
    if(key === 'ArrowDown' || key === 40 && !game.over) {
      this.isMoving = false;
      this.yFrame = 0;
    };
    //Stop moving left
    if(key === 'ArrowLeft' || key === 37 && !game.over) {
      this.isMoving = false;
      this.yFrame = 0;
    };
    //Stop moving right
    if(key === 'ArrowRight' || key === 39 && !game.over) {
      this.isMoving = false;
      this.yFrame = 31;
    };
    //Stop attacking
    if (key === ' ' || key === 32 && !game.over) {
      this.attackDirectionStop();
    }
  };

};

const player1 = new Player(startingPlayerStats);

export default player1;
