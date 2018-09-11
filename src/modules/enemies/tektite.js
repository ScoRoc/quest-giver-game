import Enemy from './Enemy.js';
import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';
import { backgroundMap } from '../maps.js';


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
  class: 'tektite',
  type: 'basic',
  maxLife: 1,
  strength: 0.5,
  points: 1,
  levelShowUp: 1
};

class Tektite extends Enemy {
  constructor() {
    super(stats);
    this.numberOfSpaces = [0, 1, 2, 3];
  };

  move() {
    //Moves if coinFlip is 1
    if (coinFlip(55) === 0) {
      let tektiteJump = coinFlip(4);
      if (tektiteJump === 0) {  //for negative x movement
        if (this.x >= this.spriteWidth * 4) {
          this.x -= this.speed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.x >= this.spriteWidth * 3) {
          this.x -= this.speed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.x >= this.spriteWidth * 2) {
          this.x -= this.speed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 1) {  //for positive x movement
        if (this.x <= backgroundMap.width - this.spriteWidth * 4) {
          this.x += this.speed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.x <= backgroundMap.width - this.spriteWidth * 3) {
          this.x += this.speed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.x <= backgroundMap.width - this.spriteWidth * 2) {
          this.x += this.speed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 2) {  //for negative y movement
        if (this.y >= this.spriteHeight * 4) {
          this.y -= this.speed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.y >= this.spriteHeight * 3) {
          this.y -= this.speed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.y >= this.spriteHeight * 2) {
          this.y -= this.speed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 3) {  //for positive y movement
        if (this.y <= backgroundMap.height - this.spriteHeight * 4) {
          this.y += this.speed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.y <= backgroundMap.height - this.spriteHeight * 3) {
          this.y += this.speed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.y <= backgroundMap.height - this.spriteHeight * 2) {
          this.y += this.speed * this.numberOfSpaces[coinFlip(2)];
        };
      };
    };
  };
};

export default Tektite;
