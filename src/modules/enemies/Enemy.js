import { newImage } from '../nonMathHelpers.js';
import { ctxEnemyMap } from '../maps.js';

class Enemy {
  constructor(img, pngWidth, pngHeight, spriteWidth, spriteHeight, xStart, yStart, speed, className, type, maxLife, strength, points, levelShowUp) {
    this.image = newImage(img);
    this.xFrame = 0;  // x starting point of src img for sprite frame
    this.yFrame = 0;  // y starting point of src img for sprite frame
    this.pngWidth = pngWidth;  // width of src img sprite size
    this.pngHeight = pngHeight;  // height of src img sprite size
    this.spriteWidth = spriteWidth;  // width of sprite on canvas
    this.spriteHeight = spriteHeight;  // height of sprite on canvas
    this.x = xStart;  // x point of enemy on canvas
    this.y = yStart;  // y point of enemy on canvas
    this.xCenter = this.spriteWidth / 2;  // x center of hit box
    this.yCenter = this.spriteHeight / 2;  // y center of hit box
    this.speed = speed; // number of px to move
    this.class = className; // class of enemy
    this.type = type;  // enemy type
    this.maxLife = maxLife;  // how much starting life is
    this.currentLife = this.maxLife;  // how much current life
    this.strength = strength;  // how much life taken per hit to Player
    this.dead = false;  // tracks if dead or not
    this.points = points;  // how many points killing enemy is worth
    this.levelShowUp = levelShowUp;  // first level seen
  };

  draw() {
    ctxEnemyMap.drawImage(this.image, this.xFrame, this.yFrame, this.pngWidth, this.pngHeight, this.xMove, this.yMove, this.spriteWidth, this.spriteHeight);
  }
};

export default Enemy;
