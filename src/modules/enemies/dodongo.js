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
  xStart: -100,
  yStart: yStarting(50),
  speed: 0.9,
  type: 'xRightRunner',
  maxLife: 3,
  strength: 2.5,
  points: 2,
  levelShowUp: 5
};

class Dodongo extends Enemy {
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
      stats.type,
      stats.maxLife,
      stats.strength,
      stats.points,
      stats.levelShowUp
    );
  };

  move() {
    this.x += this.speed;
  }

};

export default Dodongo;
