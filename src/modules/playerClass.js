
import { xStarting, yStarting } from './mathHelpers.js';
import { newImage } from './nonMathHelpers.js';
import { backgroundMap } from './maps.js';
import { game, background, areEnemiesDead } from '../app.js';
import { ctxExplosionCanvas, enemyMap } from './maps.js';
import { heartOne, heartTwo, heartThree, heartFour } from './items/hearts.js';

const stats = {
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
  constructor(
    image,
    xFrame,
    yFrame,
    pngWidth,
    pngHeight,
    spriteWidth,
    spriteHeight,
    bottomBound,
    rightBound,
    x,
    y,
    speed,
    life,
    maxLife,
    level,
    xpToLevel
  ) {
    this.image = image;  //src image
    this.xFrame = xFrame;  //x starting point of src img for sprite frame
    this.yFrame = yFrame;  //y starting point of src img for sprite frame
    this.upFrame = 0;  //placeholder for frame iteration
    this.downFrame = 0;  //placeholder for frame iteration
    this.leftFrame = 0;  //placeholder for frame iteration
    this.rightFrame = 0;  //placeholder for frame iteration
    this.pngWidth = pngWidth;  //width of src img sprite size
    this.pngHeight = pngHeight;  //height of src img sprite size
    this.spriteWidth = spriteWidth;  //width of sprite on canvas
    this.spriteHeight = spriteHeight;  //height of sprite on canvas
    this.bottomBound = bottomBound;
    this.rightBound = rightBound;
    this.x = x;  //x point of link on canvas
    this.y = y;  //y point of link on canvas
    this.speed = speed;  //number of px moved per interval
    this.frameSpeed = 14;  //number to calculate frame switch rate
    this.isMoving = false; //tracks to see if moving
    this.isMovingUp = false; //tracks to see if moving up
    this.isMovingDown = false; //tracks to see if moving down
    this.isMovingLeft = false; //tracks to see if moving left
    this.isMovingRight = false; //tracks to see if moving right
    this.isAttacking = false; //tracks to see if attacking
    this.attackTime = null;  //tracks time link attacked
    this.hitTime = null;  //tracks time link was hit
    this.heartTime = null;  //tracks time when link picked up heart
    this.life = life;  //how much life left
    this.maxLife = maxLife;  //max life
    this.level = level;  //player level
    this.xp = 0;  //current player experience
    this.xpToLevel = xpToLevel;  //xp needed for next level
    this.quests = [];  //array of current quests
    this.invincible = false;  //checks for invincibility
    this.moveUpAnimation = null;  //function for down movement
    this.moveDownAnimation = null;  //function for up movement
    this.moveLeftAnimation = null;  //function for left movement
    this.moveRightAnimation = null;  //function for right movement
    this.upMapMove = 0; //y px where link causes map to move up
    this.downMapMove = backgroundMap.height - 34; //y px where link causes map to move down
    this.leftMapMove = 0; //x px where link causes map to move left
    this.rightMapMove = backgroundMap.width - 32; //x px where link causes map to move right
  };

  funcName() {
    //
  };

};

export { Player, stats };
