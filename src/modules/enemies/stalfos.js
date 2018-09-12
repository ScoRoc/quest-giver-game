import Enemy from './Enemy.js';
import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';
import player1 from '../Player.js';

//skeleton creature, moves quickly towards Player
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
  class: 'stalfos',
  type: 'smart',
  maxLife: 2,
  strength: 1.5,
  points: 1,
  levelShowUp: 4
};

class Stalfos extends Enemy {
  constructor() {
    super(stats);
    this.numberOfSpaces = [1];
  };

  move() {
    //Moves if coinFlip is 1
    if (coinFlip(2) === 0) {
      if (this.x - player1.x >= 0) {
        this.x -= this.speed * this.numberOfSpaces[coinFlip(1)];
      } else if (this.x - player1.x < 0) {
        this.x += this.speed * this.numberOfSpaces[coinFlip(1)];
      }
    } else if (coinFlip(2) === 1) {
      if (this.y - player1.y >= 0) {
        this.y -= this.speed * this.numberOfSpaces[coinFlip(1)];
      } else if (this.y - player1.y < 0) {
        this.y += this.speed * this.numberOfSpaces[coinFlip(1)];
      }
    }
  };

  animate() {
    super.draw();
    this.move();
  };

};

export default Stalfos;
