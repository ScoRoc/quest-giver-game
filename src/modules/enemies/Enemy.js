import { newImage } from '../nonMathHelpers.js';
import { ctxEnemyMap } from '../maps.js';

class Enemy {
  constructor(stats) {
    this.image = newImage(stats.img);
    this.xFrame = 0;  // x starting point of src img for sprite frame
    this.yFrame = 0;  // y starting point of src img for sprite frame
    this.pngWidth = stats.pngWidth;  // width of src img sprite size
    this.pngHeight = stats.pngHeight;  // height of src img sprite size
    this.spriteWidth = stats.spriteWidth;  // width of sprite on canvas
    this.spriteHeight = stats.spriteHeight;  // height of sprite on canvas
    this.x = stats.xStart;  // x point of enemy on canvas
    this.y = stats.yStart;  // y point of enemy on canvas
    this.xCenter = this.spriteWidth / 2;  // x center of hit box
    this.yCenter = this.spriteHeight / 2;  // y center of hit box
    this.speed = stats.speed; // number of px to move
    this.class = stats.className; // class of enemy
    this.type = stats.type;  // enemy type
    this.maxLife = stats.maxLife;  // how much starting life is
    this.life = this.maxLife;  // how much current life
    this.strength = stats.strength;  // how much life taken per hit to Player
    this.dead = false;  // tracks if dead or not
    this.points = stats.points;  // how many points killing enemy is worth
    this.levelShowUp = stats.levelShowUp;  // first level seen
  };

  draw() {
    ctxEnemyMap.drawImage(this.image, this.xFrame, this.yFrame, this.pngWidth, this.pngHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
  };
};

export default Enemy;
