import { newImage } from '../nonMathHelpers.js';
import { ctxEnemyMap } from '../maps.js';

const stats = {
  img: 'images/fire-dot.png',
  xFrame: 0,
  yFrame: 0,
  pngWidth: 600,
  pngHeight: 560,
  x: 250,
  y: 250,
  spriteWidth: 30,
  spriteHeight: 28
};

class FireDoT {
  constructor() {
    this.image = newImage(stats.img);
    this.xFrame = 0;  // x starting point of src img for sprite frame
    this.yFrame = 0;  // y starting point of src img for sprite frame
    this.pngWidth = stats.pngWidth;  // width of src img sprite size
    this.pngHeight = stats.pngHeight;  // height of src img sprite size
    this.x = stats.x;  // x point of fire on canvas
    this.y = stats.y;  // y point of fire on canvas
    this.spriteWidth = stats.spriteWidth;  // width of sprite on canvas
    this.spriteHeight = stats.spriteHeight;  // height of sprite on canvas
    this.type = 'fire';
    this.desc = 'Deals 0.5 dmg every 1 sec for 3 sec';
    this.isOnEnemy = null;
    this.isAttacking = false;
  };

  draw() {
    ctxEnemyMap.drawImage(this.image, this.xFrame, this.yFrame, this.pngWidth, this.pngHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
  };

};

const allFireDoTs = [];

export { FireDoT, allFireDoTs };
