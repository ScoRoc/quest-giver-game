import Enemy from './Enemy.js';
import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';
import link from '../player.js';

//skeleton creature, moves quickly towards link
//worth 1 point || strength 1.5 || max life 2
// level 4+

const stats = {
  img: 'images/stalfos.png',
  pngWidth: 16,
  pngHeight: 16,
  spriteWidth: 43,
  spriteHeight: 43,
  xStart: xStarting(50),
  yStart: yStarting(50),
  speed: 2,
  maxLife: 2,
  strength: 1.5,
  points: 1,
  levelShowUp: 4
};

class Stalfos extends Enemy {
  constructor() {
    super(
      stats.img,
      stats.pngWidth,
      stats.pngHeight,
      stats.spriteWidth,
      stats.spriteHeight,
      stats.xStart,
      stats.yStart,
      stats.speed,
      stats.maxLife,
      stats.strength,
      stats.points,
      stats.levelShowUp
    );
    this.numberOfSpaces = [1];
  };

  move() {
    //Moves if coinFlip is 1
    if (coinFlip(2) === 0) {
      if (this.xMove - link.xMove >= 0) {
        this.xMove -= this.speed * this.numberOfSpaces[coinFlip(1)];
      } else if (this.xMove - link.xMove < 0) {
        this.xMove += this.speed * this.numberOfSpaces[coinFlip(1)];
      }
    } else if (coinFlip(2) === 1) {
      if (this.yMove - link.yMove >= 0) {
        this.yMove -= this.speed * this.numberOfSpaces[coinFlip(1)];
      } else if (this.yMove - link.yMove < 0) {
        this.yMove += this.speed * this.numberOfSpaces[coinFlip(1)];
      };
    };
  }

};

export default Stalfos;
