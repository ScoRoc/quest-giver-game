import { yStarting } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';

//dinosaur creature, moves normal across the screen, L to R
//worth 2 points || strength 2.5 || max life 3
// level 5+

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

class Dodongo extends Enemy {
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

let dodongo = {
  image: newImage('images/dodongo.png'),
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

export default Dodongo;
