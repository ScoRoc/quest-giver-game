import Enemy from './Enemy.js';
import { xStarting, yStarting } from '../mathHelpers.js';
import player1 from '../Player.js';
import { backgroundMap } from '../maps.js';

//loch ness monster creature, rush across screen R to L, goes towards Player if hes near
//worth 3 points || strength 2 || max life 2
// level 9+

const stats = {
  img: 'images/aquamentus.png',
  pngWidth: 24,
  pngHeight: 32,
  spriteWidth: 41.25,
  spriteHeight: 55,
  get xStart() { return backgroundMap.width + this.spriteWidth },
  yStart: yStarting(60),
  speed: 1.15,
  class: 'aquamentus',
  type: 'xLeftRunner',
  maxLife: 3,
  strength: 2,
  points: 3,
  levelShowUp: 9
};

class Aquamentus extends Enemy {
  constructor() {
    super(stats);
  };

  move() {
    //charges Player if close, otherwise charges left
    let lx = player1.x;
    let ly = player1.y;
    let tx = this.x;
    let ty = this.y;
    if (lx - tx > 0 && lx - tx < 100 && ly - ty > 0 && ly - ty < 100) {
      //diagonally down right
      this.x += this.speed;
      this.y += this.speed;
    } else if (lx - tx > 0 && lx - tx < 100 && ly - ty < 0 && ly - ty > -100) {
      //diagonally up right
      this.x += this.speed;
      this.y -= this.speed;
    } else if (lx - tx < 0 && lx - tx > -100 && ly - ty < 0 && ly - ty > -100) {
      //diagonally top left
      this.x -= this.speed;
      this.y -= this.speed;
    } else if (lx - tx < 0 && lx - tx > -100 && ly - ty > 0 && ly - ty < 100) {
      //diagonally down left
      this.x -= this.speed;
      this.y += this.speed;
    } else {
      this.x -= this.speed;
    };
  };

};

export default Aquamentus;
