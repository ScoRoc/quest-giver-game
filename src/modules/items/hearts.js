import { xStarting, yStarting } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';

// let bigHeartPng = new Image();
// bigHeartPng.src = 'images/big-heart.png';

const heartGifArray = [
  $('#heart-one'),
  $('#heart-two'),
  $('#heart-three'),
  $('#heart-four')
];

//Define hearts
let heart = {
  image: newImage('images/heart.gif'),
  xFrame: 57,  //x starting point of src img for sprite frame
  yFrame: 62,  //y starting point of src img for sprite frame
  pngWidth: 59,  //width of src img sprite size
  pngHeight: 59,  //height of src img sprite size
  spriteWidth: 18,  //width of sprite on canvas
  spriteHeight: 18,  //height of sprite on canvas
  x: xStarting(20),  //x value where to display heart
  y: yStarting(20),  //y value where to display heart
  show: false,
  heartAnimation: null
};

let bigHeart = {
  image: newImage('images/big-heart.png'),
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 13,  //width of src img sprite size
  pngHeight: 13,  //height of src img sprite size
  spriteWidth: 30,  //width of sprite on canvas
  spriteHeight: 30,  //height of sprite on canvas
  x: xStarting(80),  //x value where to display heart
  y: yStarting(80),  //y value where to display heart
  show: false,
  heartAnimation: null
};

let updateHeartDisplay = player => {
  if (player.life === player.maxLife) {
    for (let i = 0; i < heartGifArray.length; i ++) {
      heartGifArray[i].removeClass('damaged');
      heartGifArray[i].removeClass('heart-hidden');
      heartGifArray[i].addClass('heart-show');
    };
  } else {
    for (let i = 0; i < player.maxLife - player.life; i++) {
      heartGifArray[i].removeClass('heart-show');
      heartGifArray[i].addClass('heart-hidden');
    }
    if ((player.life % 1).toFixed(1) > 0) { // is current life at a decimal
      let currentHeart = heartGifArray[player.maxLife - Math.ceil(player.life)];
      currentHeart.removeClass('heart-hidden');
      currentHeart.addClass('damaged');
      currentHeart.addClass('heart-show');
    }
  }
};

export { heart, bigHeart, updateHeartDisplay };
