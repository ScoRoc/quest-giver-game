import Enemy from './Enemy.js';
import { xStarting, yStarting } from '../mathHelpers.js';
import player1 from '../Player.js';

//statue knight creature, stands still until Player is near then moves towards
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
  class: 'armos',
  type: 'smart',
  maxLife: 2.5,
  strength: 2,
  points: 3,
  levelShowUp: 6
};

class Armos extends Enemy {
  constructor() {
    super(stats);
  };

  move() {
    //stands still until Player is close, then charges Player
    let lx = player1.x;
    let ly = player1.y;
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
