import Enemy from './Enemy.js';
import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';
import player1 from '../Player.js';

//mummy creature, moves 1px frequently, somewhat slow and towards Player
//worth 1 point || strength 1 || max life 2
//level 3+

const stats = {
  img: 'images/gibdo.png',
  pngWidth: 16,
  pngHeight: 16,
  spriteWidth: 43,
  spriteHeight: 43,
  xStart: xStarting(50),
  yStart: yStarting(50),
  speed: 1.75,
  class: 'gibdo',
  type: 'smart',
  maxLife: 2,
  strength: 1,
  points: 1,
  levelShowUp: 3
};

class Gibdo extends Enemy {
  constructor() {
    super(stats);
    this.numberOfSpaces = [0, 1];
  };

  move() {
    //Moves on coinFlip
    if (coinFlip(2) === 0) {
      if (this.x - player1.x >= 0) {
        this.x -= this.speed * this.numberOfSpaces[coinFlip(2)];
      } else if (this.x - player1.x < 0) {
        this.x += this.speed * this.numberOfSpaces[coinFlip(2)];
      }
    } else if (coinFlip(2) === 1) {
      if (this.y - player1.y >= 0) {
        this.y -= this.speed * this.numberOfSpaces[coinFlip(2)];
      } else if (this.y - player1.y < 0) {
        this.y += this.speed * this.numberOfSpaces[coinFlip(2)];
      }
    }
  };

  animate() {
    super.draw();
    this.move();
  };

};

export default Gibdo;
