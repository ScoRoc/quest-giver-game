import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';

//bat creature, moves 1 space, normal speed and randomly
//worth 1 point || strength 0.5 || max life 1
// level 2+
let keese = {
  image: newImage('images/keese.png'),
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 10,  //height of src img sprite size
  spriteWidth: 36,  //width of sprite on canvas
  spriteHeight: 22.5,  //height of sprite on canvas
  xMove: xStarting(40),  //x point of keese on canvas
  yMove: yStarting(45),  //y point of keese on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  // moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 16, //number of px to move
  numberOfSpaces: [0, 1], //possible spaces moved
  type: 'random',  //what type of enemy
  life: 0,  //how much current life
  maxLife: 1,  //how much starting life
  strength: 0.5,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 1,  //how many points killing keese is worth
  levelShowUp: 2,  //first level seen

  moveKeese: function() {
    //Moves if coinFlip is 1
    if (coinFlip(20) === 0) {
      let keeseJump = coinFlip(4);
      if (keeseJump === 0) {  //for negative x movement
        if (this.xMove >= 32) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (keeseJump === 1) {  //for positive x movement
        if (this.xMove <= 464) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (keeseJump === 2) {  //for negative y movement
        if (this.yMove >= 32) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (keeseJump === 3) {  //for positive y movement
        if (this.yMove <= 304) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      };
    };
  }
};

export default keese;
