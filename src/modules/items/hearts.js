import { xStarting, yStarting } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';
import { ctxEnemyMap } from '../maps.js';


//Heart Stats

let heartStats = {
  img: 'images/heart.gif',
  xFrame: 57,
  yFrame: 62,
  pngWidth: 59,
  pngHeight: 59,
  spriteWidth: 18,
  spriteHeight: 18,
  x: xStarting(20),
  y: yStarting(20),
  show: false,
  heartAnimation: null,
  type: 'regular',
  points: 1
};

let bigHeartStats = {
  img: 'images/big-heart.png',
  xFrame: 0,
  yFrame: 0,
  pngWidth: 13,
  pngHeight: 13,
  spriteWidth: 30,
  spriteHeight: 30,
  x: xStarting(80),
  y: yStarting(80),
  show: false,
  heartAnimation: null,
  type: 'max'
};


// Heart Classes

class Heart {
  constructor(stats) {
    this.image = newImage(stats.img);
    this.xFrame = stats.xFrame;  //x starting point of src img for sprite frame
    this.yFrame = stats.yFrame;  //y starting point of src img for sprite frame
    this.pngWidth = stats.pngWidth;  //width of src img sprite size
    this.pngHeight = stats.pngHeight;  //height of src img sprite size
    this.spriteWidth = stats.spriteWidth;  //width of sprite on canvas
    this.spriteHeight = stats.spriteHeight;  //height of sprite on canvas
    this.x = stats.x;  //x value where to display heart
    this.y = stats.y;  //y value where to display heart
    this.show = stats.show;
    this.heartAnimation = stats.heartAnimation;
    this.type = stats.type;  //type of heart
    this.points = stats.points;  //amount of life this restore
  };

  draw() {
    ctxEnemyMap.drawImage(this.image, this.xFrame, this.yFrame, this.pngWidth, this.pngHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
  };

};

class BigHeart {
  constructor(stats) {
    this.image = newImage(stats.img);
    this.xFrame = stats.xFrame;  //x starting point of src img for sprite frame
    this.yFrame = stats.yFrame;  //y starting point of src img for sprite frame
    this.pngWidth = stats.pngWidth;  //width of src img sprite size
    this.pngHeight = stats.pngHeight;  //height of src img sprite size
    this.spriteWidth = stats.spriteWidth;  //width of sprite on canvas
    this.spriteHeight = stats.spriteHeight;  //height of sprite on canvas
    this.x = stats.x;  //x value where to display heart
    this.y = stats.y;  //y value where to display heart
    this.show = stats.show;
    this.heartAnimation = stats.heartAnimation;
    this.type = stats.type;  //type of heart
    // this.points = stats.points;  //amount of life this restore
  };

  draw() {
    ctxEnemyMap.drawImage(this.image, this.xFrame, this.yFrame, this.pngWidth, this.pngHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
  };

};

// Heart Instances

let heartInstance = new Heart(heartStats);
let bigHeartInstance = new BigHeart(bigHeartStats);


// Heart Functions

const heartGifArray = [
  $('#heart-one'),
  $('#heart-two'),
  $('#heart-three'),
  $('#heart-four')
];

let fullHearts = () => {
  heartGifArray.forEach(heart => {
    heart.removeClass('damaged');
    heart.removeClass('heart-hidden');
    heart.addClass('heart-show');
  });
};

let updateHeartDisplay = player => {
  if (player.life === player.maxLife) {
    fullHearts();
  } else {
    fullHearts();
    heartGifArray.forEach( (heart, i) => {
      if (i < player.maxLife - player.life) {
        heart.removeClass('heart-show');
        heart.addClass('heart-hidden');
      }
    });
    if ((player.life % 1).toFixed(1) > 0) { // is current life at a decimal
      let currentHeart = heartGifArray[player.maxLife - Math.ceil(player.life)];
      currentHeart.removeClass('heart-hidden');
      currentHeart.addClass('damaged');
      currentHeart.addClass('heart-show');
    }
  }
};

export { heartInstance, bigHeartInstance, updateHeartDisplay };
