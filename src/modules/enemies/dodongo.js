import { yStarting } from '../mathHelpers.js';

let dodongoPng = new Image();
dodongoPng.src = 'images/dodongo.png';

//dinosaur creature, moves normal across the screen, L to R
//worth 2 points || strength 2.5 || max life 3
// level 5+
let dodongo = {
  image: dodongoPng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 32,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 90,  //width of sprite on canvas
  spriteHeight: 45,  //height of sprite on canvas
  xMove: -100,  //x point of dodongo on canvas
  yMove: yStarting(50),  //y point of dodongo on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  // moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 0.9, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'xRightRunner',  //what type of enemy
  life: 0,  //how much life
  maxLife: 3,  //how much starting life
  strength: 2.5,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 2,  //how many points killing dodongo is worth
  levelShowUp: 5,  //first level seen

  moveDodongo: function() {
    this.xMove += this.moveSpeed;
  }
};

export default dodongo;
