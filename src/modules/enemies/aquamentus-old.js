import { xStarting, yStarting } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';
import link from '../player.js';

//loch ness monster creature, rush across screen R to L, goes towards link if hes near
//worth 3 points || strength 2 || max life 2
// level 9+
let aquamentus = {
  image: newImage('images/aquamentus.png'),
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 24,  //width of src img sprite size
  pngHeight: 32,  //height of src img sprite size
  spriteWidth: 41.25,  //width of sprite on canvas
  spriteHeight: 55,  //height of sprite on canvas
  xMove: 555,  //x point of aquamentus on canvas
  yMove: yStarting(60),  //y point of aquamentus on canvas
  xCenter: 19,  //x center of hit box
  yCenter: 25,  //y center of hit box
  moveAnimation: null,  //movement AI
  // moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 1.15, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'xLeftRunner',  //what type of enemy
  life: 0,  //how much life
  maxLife: 2,  //how much starting life
  strength: 2,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 3,  //how many points killing aquamentus is worth
  levelShowUp: 9,  //first level seen

  moveAquamentus: function() {
    //charges link if close, otherwise charges left
    let lx = link.xMove;
    let ly = link.yMove;
    let tx = this.xMove;
    let ty = this.yMove;
    if (lx - tx > 0 && lx - tx < 100 && ly - ty > 0 && ly - ty < 100) {
      //diagonally down right
      this.xMove += this.moveSpeed;
      this.yMove += this.moveSpeed;
    } else if (lx - tx > 0 && lx - tx < 100 && ly - ty < 0 && ly - ty > -100) {
      //diagonally up right
      this.xMove += this.moveSpeed;
      this.yMove -= this.moveSpeed;
    } else if (lx - tx < 0 && lx - tx > -100 && ly - ty < 0 && ly - ty > -100) {
      //diagonally top left
      this.xMove -= this.moveSpeed;
      this.yMove -= this.moveSpeed;
    } else if (lx - tx < 0 && lx - tx > -100 && ly - ty > 0 && ly - ty < 100) {
      //diagonally down left
      this.xMove -= this.moveSpeed;
      this.yMove += this.moveSpeed;
    } else {
      this.xMove -= this.moveSpeed;
    };
  }
};

export default aquamentus;
