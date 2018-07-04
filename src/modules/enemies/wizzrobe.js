import Enemy from './Enemy.js';
import { xStarting, yStarting } from '../mathHelpers.js';
import link from '../player.js';

//scared wizard creature, runs away from link
//worth 1 point || strength 1 || max life 2
//leve 7+

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

class Wizzrobe extends Enemy {
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

let wizzrobe = {
  image: newImage('images/wizzrobe.png'),
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 15,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 40.3125,  //width of sprite on canvas
  spriteHeight: 43,  //height of sprite on canvas
  xMove: xStarting(45),  //x point of wizzrobe on canvas
  yMove: yStarting(45),  //y point of wizzrobe on canvas
  xCenter: 23,  //x center of hit box
  yCenter: 23,  //y center of hit box
  moveAnimation: null,  //movement AI
  // moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 1, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'scared',  //what type of enemy
  life: 0,  //how much life
  maxLife: 2,  //how much starting life
  strength: 1,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 1,  //how many points killing wizzrobe is worth
  levelShowUp: 7,  //first level seen

  moveWizzrobe: function() {
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
  }
};

export default Wizzrobe;
