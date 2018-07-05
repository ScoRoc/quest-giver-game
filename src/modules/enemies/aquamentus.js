import Enemy from './Enemy.js';
import { xStarting, yStarting } from '../mathHelpers.js';
import link from '../player.js';
import { backgroundMap } from '../maps.js';

//loch ness monster creature, rush across screen R to L, goes towards link if hes near
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
  type: 'xLeftRunner',
  maxLife: 2,
  strength: 2,
  points: 3,
  levelShowUp: 9
};

class Aquamentus extends Enemy {
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
    //charges link if close, otherwise charges left
    let lx = link.x;
    let ly = link.y;
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
