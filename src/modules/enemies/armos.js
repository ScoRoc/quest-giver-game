import { xStarting, yStarting } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';
import link from '../player.js';

//statue knight creature, stands still until link is near then moves towards
//worth 2 points || strength 2 || max life 2
// level 6+

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
      stats.maxLife,
      stats.strength,
      stats.points,
      stats.levelShowUp
    );
  };

};

let armos = {
  image: newImage('images/armos.png'),
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 47,  //width of sprite on canvas
  spriteHeight: 47,  //height of sprite on canvas
  xMove: xStarting(80),  //x point of armos on canvas
  yMove: yStarting(70),  //y point of armos on canvas
  xCenter: 23,  //x center of hit box
  yCenter: 23,  //y center of hit box
  moveAnimation: null,  //movement AI
  // moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 1.2, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'smart',  //what type of enemy
  life: 0,  //how much life
  maxLife: 2,  //how much starting life
  strength: 2,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 3,  //how many points killing armos is worth
  levelShowUp: 6,  //first level seen

  moveArmos: function() {
    //stands still until link is close, then charges link
    let lx = link.xMove;
    let ly = link.yMove;
    let tx = this.xMove;
    let ty = this.yMove;
    if (lx - tx > 0 && lx - tx < 115 && ly - ty > 0 && ly - ty < 115) {
      //diagonally down right
      this.xMove += this.moveSpeed;
      this.yMove += this.moveSpeed;
    } else if (lx - tx > 0 && lx - tx < 115 && ly - ty < 0 && ly - ty > -115) {
      //diagonally up right
      this.xMove += this.moveSpeed;
      this.yMove -= this.moveSpeed;
    } else if (lx - tx < 0 && lx - tx > -115 && ly - ty < 0 && ly - ty > -115) {
      //diagonally top left
      this.xMove -= this.moveSpeed;
      this.yMove -= this.moveSpeed;
    } else if (lx - tx < 0 && lx - tx > -115 && ly - ty > 0 && ly - ty < 115) {
      //diagonally down left
      this.xMove -= this.moveSpeed;
      this.yMove += this.moveSpeed;
    };
  }
};

export default Armos;
