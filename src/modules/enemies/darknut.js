import Enemy from './Enemy.js';
import { xStarting } from '../mathHelpers.js';

//knight creature rushes down screen like dodongo but faster or randomly after enemy dies
//worth 3 points || strength 2.5 || max life 1
// level 8+

const stats = {
  img: 'images/darknut.png',
  pngWidth: 16,
  pngHeight: 16,
  spriteWidth: 45,
  spriteHeight: 45,
  xStart: xStarting(50),
  get yStart() { return -this.spriteHeight * 1.25 },
  speed: 1.6,
  class: 'darknut',
  type: 'yRunner',
  maxLife: 1,
  strength: 2.5,
  points: 4,
  levelShowUp: 8
};

class Darknut extends Enemy {
  constructor() {
    super(stats);
  };

  move() {
    this.y += this.speed;
  };

};

export default Darknut;
