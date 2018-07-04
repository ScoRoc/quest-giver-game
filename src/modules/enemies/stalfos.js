import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';
import link from '../player.js';

//skeleton creature, moves quickly towards link
//worth 1 point || strength 1.5 || max life 2
// level 4+

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

class Stalfos extends Enemy {
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

let stalfos = {
  image: newImage('images/stalfos.png'),
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 43,  //width of sprite on canvas
  spriteHeight: 43,  //height of sprite on canvas
  xMove: xStarting(50),  //x point of stalfos on canvas
  yMove: yStarting(50),  //y point of stalfos on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  // moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 2, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'smart',  //what type of enemy
  life: 0,  //how much life
  maxLife: 2,  //how much starting life
  strength: 1.5,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 1,  //how many points killing stalfos is worth
  levelShowUp: 4,  //first level seen

  moveStalfos: function() {
    //Moves if coinFlip is 1
    if (coinFlip(2) === 0) {
      if (this.xMove - link.xMove >= 0) {
        this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(1)];
      } else if (this.xMove - link.xMove < 0) {
        this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(1)];
      }
    } else if (coinFlip(2) === 1) {
      if (this.yMove - link.yMove >= 0) {
        this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(1)];
      } else if (this.yMove - link.yMove < 0) {
        this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(1)];
      };
    };
  }
};

export default Stalfos;
