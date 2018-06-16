import { coinFlip, xStarting, yStarting } from '../mathHelpers.js';

let darknutPng = new Image();
darknutPng.src = 'images/darknut.png';

//knight creature rushes down screen like dodongo but faster or randomly after enemy dies
//worth 3 points || strength 2.5 || max life 1
// level 8+
let darknut = {
  image: darknutPng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 45,  //width of sprite on canvas
  spriteHeight: 45,  //height of sprite on canvas
  xMove: xStarting(50),  //x point of darknut on canvas
  yMove: -60,  //y point of darknut on canvas
  xCenter: 23,  //x center of hit box
  yCenter: 23,  //y center of hit box
  moveAnimation: null,  //movement AI
  // moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 1.6, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'yRunner',  //what type of enemy
  life: 0,  //how much life
  maxLife: 1,  //how much starting life
  strength: 2.5,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 4,  //how many points killing darknut is worth
  levelShowUp: 8,  //first level seen

  moveDarknut: function() {
    this.yMove += this.moveSpeed;
  }
};

export default darknut;
