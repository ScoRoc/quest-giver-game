import { xStarting, yStarting } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';
import link from '../player.js';

//boss - goblin type creature, 3 stages 1) circle, 2) runner, 3) scared
//worth 5 points || strength 1 || max life 6
//level 10

const stats = {
  img: 'images/tektite.png',
  pngWidth: 16,
  pngHeight: 15,
  spriteWidth: 37.5,
  spriteHeight: 40,
  xStart: xStarting(40),
  yStart: yStarting(45),
  speed: 16,
  maxLife: 1,
  strength: 0.5,
  points: 1,
  levelShowUp: 1
};

class Moblin extends Enemy {
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
      stats.maxLife,
      stats.strength,
      stats.points,
      stats.levelShowUp
    );
  };

};

let moblin = {
  image: newImage('images/moblin.png'),
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 65,  //width of sprite on canvas
  spriteHeight: 65,  //height of sprite on canvas
  xMove: xStarting(70),  //x point of moblin on canvas
  yMove: yStarting(70),  //y point of moblin on canvas
  xCenter: 35,  //x center of hit box
  yCenter: 35,  //y center of hit box
  moveAnimation: null,  //movement AI
  // moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 2.1, //number of px to move
  cycleOne: 11,  //cycle of movement for stage one
  cycleTwo: 11,  //cycle of movement for stage two
  numberOfSpaces: [1], //possible spaces moved
  type: 'boss',  //what type of enemy
  life: 0,  //how much life
  maxLife: 6,  //how much starting life
  strength: 1,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 5,  //how many points killing moblin is worth
  levelShowUp: 10,  //first level seen

  moveMoblin: function() {
    if (this.life > 4) {  //Stage One
      this.moveSpeed = 2.1;
      if (this.cycleOne === 11) {  //Move R
        if (this.xMove < 447) {
          this.xMove += this.moveSpeed;
        } else if (this.xMove >= 447) {
          this.cycleOne++;
        };
      } else if (this.cycleOne === 12) {  //Move slightly back L
        if (this.xMove > 400) {
          this.xMove -= this.moveSpeed;
        } else if (this.xMove <= 400) {
          this.cycleOne = 21;
        };
      } else if (this.cycleOne === 21) {  //Move Up
        if (this.yMove > 0) {
          this.yMove -= this.moveSpeed;
        } else if (this.yMove <= 0) {
          this.cycleOne++;
        };
      } else if (this.cycleOne === 22) {  //Move slightly back down
        if (this.yMove < 75) {
          this.yMove += this.moveSpeed;
        } else if (this.yMove >= 75) {
          this.cycleOne = 31;
        };
      } else if (this.cycleOne === 31) {  //Move Left
        if (this.xMove > 0) {
          this.xMove -= this.moveSpeed;
        } else if (this.xMove <= 0) {
          this.cycleOne++;
        };
      } else if (this.cycleOne === 32) {  //Move slightly back right
        if (this.xMove < 115) {
          this.xMove += this.moveSpeed;
        } else if (this.xMove >= 115) {
          this.cycleOne = 41;
        };
      } else if (this.cycleOne === 41) {  //Move down
        if (this.yMove < 287) {
          this.yMove += this.moveSpeed;
        } else if (this.yMove >= 287) {
          this.cycleOne++;
        };
      } else if (this.cycleOne === 42) {  //Move slight back up
        if (this.yMove > 200) {
          this.yMove -= this.moveSpeed;
        } else if (this.yMove <= 200) {
          this.cycleOne = 11;
        };
      };
    } else if (this.life > 2) {  //Stage Two
      this.moveSpeed = 2;
      if (this.cycleTwo === 11) {  //Top to Bottom
        if (this.yMove < 430) {
          this.yMove += this.moveSpeed;
        } else if (this.yMove >= 430) {
          this.xMove = -80;
          this.yMove = 110;
          this.cycleTwo++;
        };
      } else if (this.cycleTwo === 12) {  //L to R
        if (this.xMove < 590) {
          this.xMove += this.moveSpeed;
        } else if (this.xMove >= 590) {
          this.xMove = 150;
          this.yMove = 365;
          this.cycleTwo++;
        };
      } else if (this.cycleTwo === 13) {  //Bottom to Top
        if (this.yMove > -80) {
          this.yMove -= this.moveSpeed;
        } else if (this.yMove <= -80) {
          this.xMove = 590;
          this.yMove = 240;
          this.cycleTwo++;
        };
      } else if (this.cycleTwo === 14) {  //R to L
        if (this.xMove > -80) {
          this.xMove -= this.moveSpeed;
        } else if (this.xMove <= -80) {
          this.xMove = 350;
          this.yMove = -80;
          this.cycleTwo = 11;
        };
      };
    } else if (this.life > 0) {   //Stage Three
      this.moveSpeed = 1.2;
        //move diagonally bottom right
      if (this.xMove - link.xMove >= 0 && this.yMove - link.yMove >= 0) {
        if (this.xMove < 445 && this.yMove < 285) {
          this.xMove += this.moveSpeed;
          this.yMove += this.moveSpeed;
        } else if (this.xMove >= 445 && this.yMove < 285) {
          this.yMove += this.moveSpeed;
        } else if (this.xMove < 445 && this.yMove >= 285) {
          this.xMove += this.moveSpeed;
        } else if (this.xMove >= 445 && this.yMove >= 285) {
          this.xMove = 230;
          this.yMove = 140;
        };
        //move diagonally top right
      } else if (this.xMove - link.xMove >= 0 && this.yMove - link.yMove <= 0) {
        if (this.xMove < 445 && this.yMove > 0) {
          this.xMove += this.moveSpeed;
          this.yMove -= this.moveSpeed;
        } else if (this.xMove >= 445 && this.yMove > 0) {
          this.yMove -= this.moveSpeed;
        } else if (this.xMove < 445 && this.yMove <= 0) {
          this.xMove += this.moveSpeed;
        } else if (this.xMove >= 445 && this.yMove <= 0) {
          this.xMove = 230;
          this.yMove = 140;
        };
        //move diagonally top left
      } else if (this.xMove - link.xMove <= 0 && this.yMove - link.yMove <= 0) {
        if (this.xMove > 0 && this.yMove > 0) {
          this.xMove -= this.moveSpeed;
          this.yMove -= this.moveSpeed;
        } else if (this.xMove <= 0 && this.yMove > 0) {
          this.yMove -= this.moveSpeed;
        } else if (this.xMove > 0 && this.yMove <= 0) {
          this.xMove -= this.moveSpeed;
        } else if (this.xMove <= 0 && this.yMove <= 0) {
          this.xMove = 230;
          this.yMove = 140;
        };
        //move diagonally bottom left
      } else if (this.xMove - link.xMove <= 0 && this.yMove - link.yMove >= 0) {
        if (this.xMove > 0 && this.yMove < 285) {
          this.xMove -= this.moveSpeed;
          this.yMove += this.moveSpeed;
        } else if (this.xMove <= 0 && this.yMove < 285) {
          this.yMove += this.moveSpeed;
        } else if (this.xMove > 0 && this.yMove >= 285) {
          this.xMove -= this.moveSpeed;
        } else if (this.xMove <= 0 && this.yMove >= 285) {
          this.xMove = 230;
          this.yMove = 140;
        }
      };
    };
  }
};

export default Moblin;
