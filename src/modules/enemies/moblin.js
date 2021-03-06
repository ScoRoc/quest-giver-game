import Enemy from './Enemy.js';
import { xStarting, yStarting } from '../mathHelpers.js';
import player1 from '../Player.js';
import { backgroundMap } from '../maps.js';

//boss - goblin type creature, 3 stages 1) circle, 2) runner, 3) scared
//worth 5 points || strength 1 || max life 6
//level 10

const stats = {
  img: 'images/moblin.png',
  pngWidth: 16,
  pngHeight: 16,
  spriteWidth: 65,
  spriteHeight: 65,
  xStart: xStarting(70),
  yStart: yStarting(70),
  speed: 1,
  class: 'moblin',
  type: 'boss',
  maxLife: 6,
  strength: 1,
  points: 5,
  levelShowUp: 10
};

class Moblin extends Enemy {
  constructor() {
    super(stats);
    this.cycleOne = 11;
    this.cycleTwo = 11;
    this.acceleration = 0.18;
  };

  move() {
    if (this.life > 4) {  //Stage One
      // this.speed = 2.1;
      if (this.cycleOne === 11) {  //Move R
        if (this.x < backgroundMap.width - this.spriteWidth) {
          this.x += this.speed;
          this.speed += this.acceleration;
        } else if (this.x >= backgroundMap.width - this.spriteWidth) {
          this.speed = 2.1;
          this.cycleOne++;
        }
      } else if (this.cycleOne === 12) {  //Move slightly back L
        if (this.x > backgroundMap.width - this.spriteWidth * 2) {
          this.x -= this.speed;
          this.speed = this.speed > this.acceleration ? this.speed - this.acceleration * 0.19 : this.speed + this.acceleration;
        } else if (this.x <= backgroundMap.width - this.spriteWidth * 2) {
          this.cycleOne = 21;
        }
      } else if (this.cycleOne === 21) {  //Move Up
        if (this.y > 0) {
          this.y -= this.speed;
          this.speed += this.acceleration;
        } else if (this.y <= 0) {
          this.speed = 2.1;
          this.cycleOne++;
        }
      } else if (this.cycleOne === 22) {  //Move slightly back down
        if (this.y < this.spriteHeight) {
          this.y += this.speed;
          this.speed = this.speed > this.acceleration ? this.speed - this.acceleration * 0.19 : this.speed + this.acceleration;
        } else if (this.y >= this.spriteHeight) {
          this.cycleOne = 31;
        }
      } else if (this.cycleOne === 31) {  //Move Left
        if (this.x > 0) {
          this.x -= this.speed;
          this.speed += this.acceleration;
        } else if (this.x <= 0) {
          this.speed = 2.1;
          this.cycleOne++;
        }
      } else if (this.cycleOne === 32) {  //Move slightly back right
        if (this.x < this.spriteWidth * 2) {
          this.x += this.speed;
          this.speed = this.speed > this.acceleration ? this.speed - this.acceleration * 0.19 : this.speed + this.acceleration;
        } else if (this.x >= this.spriteWidth * 2) {
          this.cycleOne = 41;
        }
      } else if (this.cycleOne === 41) {  //Move down
        if (this.y < backgroundMap.height - this.spriteHeight) {
          this.y += this.speed;
          this.speed += this.acceleration;
        } else if (this.y >= backgroundMap.height - this.spriteHeight) {
          this.speed = 2.1;
          this.cycleOne++;
        }
      } else if (this.cycleOne === 42) {  //Move slight back up
        if (this.y > backgroundMap.height - this.spriteHeight * 2) {
          this.y -= this.speed;
          this.speed = this.speed > this.acceleration ? this.speed - this.acceleration * 0.19 : this.speed + this.acceleration;
        } else if (this.y <= backgroundMap.height - this.spriteHeight * 2) {
          this.cycleOne = 11;
        }
      }
    } else if (this.life > 2) {  //Stage Two
      if (this.cycleTwo === 11) {  //Top to Bottom
        if (this.y < backgroundMap.height + this.spriteHeight * 1.2) {
          this.y += this.speed;
          this.speed += this.acceleration * 0.15;
        } else if (this.y >= backgroundMap.height + this.spriteHeight * 1.2) {
          this.x = -this.spriteWidth * 1.24;
          this.y = this.spriteHeight * 1.7;
          this.speed = 0.5;
          this.cycleTwo++;
        }
      } else if (this.cycleTwo === 12) {  //L to R
        if (this.x < backgroundMap.width + this.spriteWidth * 1.2) {
          this.x += this.speed;
          this.speed += this.acceleration * 0.15;
        } else if (this.x >= backgroundMap.width + this.spriteWidth * 1.2) {
          this.x = this.spriteWidth * 2.3;
          this.y = backgroundMap.height + this.spriteHeight * 0.25;
          this.speed = 0.5;
          this.cycleTwo++;
        }
      } else if (this.cycleTwo === 13) {  //Bottom to Top
        if (this.y > -this.spriteHeight * 1.23) {
          this.y -= this.speed;
          this.speed += this.acceleration * 0.15;
        } else if (this.y <= -this.spriteHeight * 1.23) {
          this.x = backgroundMap.width + this.spriteWidth * 1.2;
          this.y = backgroundMap.height - this.spriteHeight * 1.73;
          this.speed = 0.5;
          this.cycleTwo++;
        }
      } else if (this.cycleTwo === 14) {  //R to L
        if (this.x > -this.spriteWidth * 1.23) {
          this.x -= this.speed;
          this.speed += this.acceleration * 0.15;
        } else if (this.x <= -this.spriteWidth * 1.23) {
          this.x = backgroundMap.width - this.spriteWidth * 2.5;
          this.y = -this.spriteHeight * 1.23;
          this.speed = 0.5;
          this.cycleTwo = 11;
        }
      }
    } else if (this.life > 0) {   //Stage Three
      this.speed = 1.2;
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
        }
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
        }
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
        }
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
      }
    }
  };

  animate() {
    super.draw();
    this.move();
  };

};

export default Moblin;
