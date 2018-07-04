import Enemy from './Enemy.js';
import { xStarting, yStarting } from '../mathHelpers.js';
import link from '../player.js';

//statue knight creature, stands still until link is near then moves towards
//worth 2 points || strength 2 || max life 2
// level 6+

const stats = {
  img: 'images/armos.png',
  pngWidth: 16,
  pngHeight: 16,
  spriteWidth: 47,
  spriteHeight: 47,
  xStart: xStarting(80),
  yStart: yStarting(70),
  speed: 1.2,
  type: 'smart',
  maxLife: 2,
  strength: 2,
  points: 3,
  levelShowUp: 6
};

class Armos extends Enemy {
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
    //stands still until link is close, then charges link
    let lx = link.x;
    let ly = link.y;
    let tx = this.x;
    let ty = this.y;
    if (lx - tx > 0 && lx - tx < 115 && ly - ty > 0 && ly - ty < 115) {
      //diagonally down right
      this.x += this.speed;
      this.y += this.speed;
    } else if (lx - tx > 0 && lx - tx < 115 && ly - ty < 0 && ly - ty > -115) {
      //diagonally up right
      this.x += this.speed;
      this.y -= this.speed;
    } else if (lx - tx < 0 && lx - tx > -115 && ly - ty < 0 && ly - ty > -115) {
      //diagonally top left
      this.x -= this.speed;
      this.y -= this.speed;
    } else if (lx - tx < 0 && lx - tx > -115 && ly - ty > 0 && ly - ty < 115) {
      //diagonally down left
      this.x -= this.speed;
      this.y += this.speed;
    };
  };

};

export default Armos;
