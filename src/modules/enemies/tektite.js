import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';

//spider creature, jumps up to 3 spaces, slowly and randomly
//worth 1 point || strength 0.5 || max life 1
//level 1+
let tektite = {
  image: newImage('images/tektite.png'),
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 15,  //height of src img sprite size
  spriteWidth: 37.5,  //width of sprite on canvas
  spriteHeight: 40,  //height of sprite on canvas
  xMove: xStarting(40),  //x point of tektite on canvas
  yMove: yStarting(45),  //y point of tektite on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  // moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 16, //number of px to move
  numberOfSpaces: [0, 1, 2, 3], //possible spaces moved
  type: 'random',  //what type of enemy
  life: 1,  //how much current life
  maxLife: 1,  //how much starting life is
  strength: 0.5,  //how much life taken per hit to link
  dead: false,  //tracks if dead or not
  points: 1,  //how many points killing tektite is worth
  levelShowUp: 1,  //first level seen

  moveTektite: function() {
    //Moves if coinFlip is 1
    if (coinFlip(55) === 0) {
      let tektiteJump = coinFlip(4);
      if (tektiteJump === 0) {  //for negative x movement
        if (this.xMove >= 64) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.xMove >= 48) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.xMove >= 32) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 1) {  //for positive x movement
        if (this.xMove <= 432) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.xMove <= 448) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.xMove <= 464) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 2) {  //for negative y movement
        if (this.yMove >= 64) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.yMove >= 48) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.yMove >= 32) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 3) {  //for positive y movement
        if (this.yMove <= 272) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.yMove <= 288) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.yMove <= 304) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      };
    };
  }
};

export default tektite;
