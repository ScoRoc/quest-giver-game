import Enemy from './Enemy.js';
import { xStarting, yStarting } from '../mathHelpers.js';
import player1 from '../Player.js';
import { backgroundMap } from '../maps.js';

//scared wizard creature, runs away from Player
//worth 1 point || strength 1 || max life 2
//leve 7+

const stats = {
  img: 'images/wizzrobe.png',
  pngWidth: 15,
  pngHeight: 16,
  spriteWidth: 40.3124,
  spriteHeight: 43,
  xStart: xStarting(45),
  yStart: yStarting(45),
  speed: 1,
  class: 'wizzrobe',
  type: 'scared',
  maxLife: 2,
  strength: 1,
  points: 1,
  levelShowUp: 7
};

class Wizzrobe extends Enemy {
  constructor() {
    super(stats);
  };

  move() {
    //move diagonally bottom right
    if (this.x - player1.x >= 0 && this.y - player1.y >= 0) {
      if (this.x < backgroundMap.width - this.spriteWidth && this.y < backgroundMap.height - this.spriteHeight) {
        this.x += this.speed;
        this.y += this.speed;
      } else if (this.x >= backgroundMap.width - this.spriteWidth && this.y < backgroundMap.height - this.spriteHeight) {
        this.y += this.speed;
      } else if (this.x < backgroundMap.width - this.spriteWidth && this.y >= backgroundMap.height - this.spriteHeight) {
        this.x += this.speed;
      } else if (this.x >= backgroundMap.width - this.spriteWidth && this.y >= backgroundMap.height - this.spriteHeight) {
        this.x = backgroundMap.width / 2;
        this.y = backgroundMap.height / 2;
      };
      //move diagonally top right
    } else if (this.x - player1.x >= 0 && this.y - player1.y <= 0) {
      if (this.x < backgroundMap.width - this.spriteWidth && this.y > 0) {
        this.x += this.speed;
        this.y -= this.speed;
      } else if (this.x >= backgroundMap.width - this.spriteWidth && this.y > 0) {
        this.y -= this.speed;
      } else if (this.x < backgroundMap.width - this.spriteWidth && this.y <= 0) {
        this.x += this.speed;
      } else if (this.x >= backgroundMap.width - this.spriteWidth && this.y <= 0) {
        this.x = backgroundMap.width / 2;
        this.y = backgroundMap.height / 2;
      };
      //move diagonally top left
    } else if (this.x - player1.x <= 0 && this.y - player1.y <= 0) {
      if (this.x > 0 && this.y > 0) {
        this.x -= this.speed;
        this.y -= this.speed;
      } else if (this.x <= 0 && this.y > 0) {
        this.y -= this.speed;
      } else if (this.x > 0 && this.y <= 0) {
        this.x -= this.speed;
      } else if (this.x <= 0 && this.y <= 0) {
        this.x = backgroundMap.width / 2;
        this.y = backgroundMap.height / 2;
      };
      //move diagonally bottom left
    } else if (this.x - player1.x <= 0 && this.y - player1.y >= 0) {
      if (this.x > 0 && this.y < backgroundMap.height - this.spriteHeight) {
        this.x -= this.speed;
        this.y += this.speed;
      } else if (this.x <= 0 && this.y < backgroundMap.height - this.spriteHeight) {
        this.y += this.speed;
      } else if (this.x > 0 && this.y >= backgroundMap.height - this.spriteHeight) {
        this.x -= this.speed;
      } else if (this.x <= 0 && this.y >= backgroundMap.height - this.spriteHeight) {
        this.x = backgroundMap.width / 2;
        this.y = backgroundMap.height / 2;
      }
    };
  };

};

export default Wizzrobe;
