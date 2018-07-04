import Enemy from './Enemy.js';
import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';

//spider creature, jumps up to 3 spaces, slowly and randomly
//worth 1 point || strength 0.5 || max life 1
//level 1+

const stats = {
  img: 'images/tektite.png',
  pngWidth: 16,
  pngHeight: 15,
  spriteWidth: 37.5,
  spriteHeight: 40,
  xStart: xStarting(40),
  yStart: yStarting(45),
  speed: 16,
  maxLife: 1,
  strength: 0.5,
  points: 1,
  levelShowUp: 1
};

class Tektite extends Enemy {
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
    this.numberOfSpaces = [0, 1, 2, 3];
  };

  moveTektite() {
    //Moves if coinFlip is 1
    if (coinFlip(55) === 0) {
      let tektiteJump = coinFlip(4);
      if (tektiteJump === 0) {  //for negative x movement
        if (this.xMove >= 64) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.xMove >= 48) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.xMove >= 32) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 1) {  //for positive x movement
        if (this.xMove <= 432) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.xMove <= 448) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.xMove <= 464) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 2) {  //for negative y movement
        if (this.yMove >= 64) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.yMove >= 48) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.yMove >= 32) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 3) {  //for positive y movement
        if (this.yMove <= 272) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.yMove <= 288) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.yMove <= 304) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      };
    };
  };
};

export default Tektite;
