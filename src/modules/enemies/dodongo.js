import Enemy from './Enemy.js';
import { yStarting } from '../mathHelpers.js';

//dinosaur creature, moves normal across the screen, L to R
//worth 2 points || strength 2.5 || max life 3
// level 5+

const stats = {
  img: 'images/dodongo.png',
  pngWidth: 32,
  pngHeight: 16,
  spriteWidth: 90,
  spriteHeight: 45,
  get xStart() { return -this.spriteWidth * 1.25 },
  yStart: yStarting(50),
  speed: 0.9,
  class: 'dodongo',
  type: 'xRightRunner',
  maxLife: 3,
  strength: 2.5,
  points: 2,
  levelShowUp: 5
};

class Dodongo extends Enemy {
  constructor() {
    super(stats);
  };

  move() {
    this.x += this.speed;
  };

  animate() {
    super.draw();
    this.move();
  };

};

export default Dodongo;
