import { newImage } from '../../nonMathHelpers.js';
import { ctxEnemyMap } from '../../maps.js';

class Projectile {
  constructor(stats, source) {
    this.image = newImage(stats.img);
    this.xFrame = 0;  // x starting point of src img for sprite frame
    this.yFrame = 0;  // y starting point of src img for sprite frame
    this.pngWidth = stats.pngWidth;  // width of src img sprite size
    this.pngHeight = stats.pngHeight;  // height of src img sprite size
    this.spriteWidth = stats.spriteWidth;  // width of sprite on canvas
    this.spriteHeight = stats.spriteHeight;  // height of sprite on canvas
    this.type = 'projectile';
    this.speed = stats.speed;
    this.active = false;
    this.x = source.x;  // x point of projectile on canvas
    this.y = source.y;  // y point of projectile on canvas
  };

  draw() {
    ctxEnemyMap.drawImage(this.image, this.xFrame, this.yFrame, this.pngWidth, this.pngHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
  };

  move(source, target) {
    console.log('this.x: ', this.x, 'this.y: ', this.y);

    let initialX = source.x;
    let initialY = source.y;
    console.log('initialX: ', initialX, 'initialY: ', initialY);


    let targetX = target.x;
    let targetY = target.y;
    console.log('targetX: ', targetX, 'targetY: ', targetY);

    let slopeX = targetX - initialX;
    let slopeY = targetY - initialY;
    console.log('slopeX: ', slopeX, 'slopeY: ', slopeY);
    let slope = slopeX / slopeY;
    console.log('slope: ', slope);

    let a = Math.abs(initialX - this.x);
    let b = Math.abs(initialY - this.y);
    console.log('a: ', a, 'b: ', b);
    console.log('a ^ 2: ', Math.pow(a, 2), 'b ^ 2: ', Math.pow(b, 2));
    console.log('hypotenuse: ', Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) ));

    if ( Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) ) <= 150) {
      console.log('in movement part of projectile');
      this.x -= slope * this.speed;
      this.y -= slope * this.speed;
    } else {
      this.active = false;
    }
  };

  shoot(source, target) {
    this.draw();
    this.move(source, target);
  }

};

const allProjectiles = [];


export default Projectile;
export { allProjectiles };
