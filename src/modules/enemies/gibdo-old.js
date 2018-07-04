import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';
import link from '../player.js';

//mummy creature, moves 1px frequently, somewhat slow and towards link
//worth 1 point || strength 1 || max life 2
//level 3+
let gibdo = {
  image: newImage('images/gibdo.png'),
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 43,  //width of sprite on canvas
  spriteHeight: 43,  //height of sprite on canvas
  xMove: xStarting(50),  //x point of gibdo on canvas
  yMove: yStarting(50),  //y point of gibdo on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  // moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 1.75, //number of px to move
  numberOfSpaces: [0, 1], //possible spaces moved
  type: 'smart',  //what type of enemy
  life: 0,  //how much life
  maxLife: 2,  //how much starting life
  strength: 1,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 1,  //how many points killing gibdo is worth
  levelShowUp: 3,  //first level seen

  moveGibdo: function() {
    //Moves on coinFlip
    if (coinFlip(2) === 0) {
      if (this.xMove - link.xMove >= 0) {
        this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
      } else if (this.xMove - link.xMove < 0) {
        this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
      }
    } else if (coinFlip(2) === 1) {
      if (this.yMove - link.yMove >= 0) {
        this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
      } else if (this.yMove - link.yMove < 0) {
        this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
      };
    };
  }
};

export default gibdo;
