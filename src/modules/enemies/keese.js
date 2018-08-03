import Enemy from './Enemy.js';
import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';
import { backgroundMap } from '../maps.js';

//bat creature, moves 1 space, normal speed and randomly
//worth 1 point || strength 0.5 || max life 1
// level 2+

const stats = {
  img: 'images/keese.png',
  pngWidth: 16,
  pngHeight: 10,
  spriteWidth: 36,
  spriteHeight: 22.5,
  xStart: xStarting(40),
  yStart: yStarting(45),
  speed: 16,
  class: 'keese',
  type: 'basic',
  maxLife: 1,
  strength: 0.5,
  points: 1,
  levelShowUp: 2
};

class Keese extends Enemy {
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
      stats.class,
      stats.type,
      stats.maxLife,
      stats.strength,
      stats.points,
      stats.levelShowUp
    );
    this.numberOfSpaces = [0, 1];
  };

  move() {
    //Moves if coinFlip is 1
    if (coinFlip(20) === 0) {
      let keeseJump = coinFlip(4);
      if (keeseJump === 0) {  //for negative x movement
        if (this.x >= this.spriteWidth) {
          this.x -= this.speed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (keeseJump === 1) {  //for positive x movement
        if (this.x <= backgroundMap.width - this.spriteWidth) {
          this.x += this.speed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (keeseJump === 2) {  //for negative y movement
        if (this.y >= this.spriteHeight) {
          this.y -= this.speed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (keeseJump === 3) {  //for positive y movement
        if (this.y <= backgroundMap.height - this.spriteHeight) {
          this.y += this.speed * this.numberOfSpaces[coinFlip(2)];
        };
      };
    };
  }

};

export default Keese;
