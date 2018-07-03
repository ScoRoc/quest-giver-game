import { xStarting, yStarting } from '../mathHelpers.js';

let heartPng = new Image();
heartPng.src = 'images/heart.gif';

let bigHeartPng = new Image();
bigHeartPng.src = 'images/big-heart.png';

let heartOne = $('#heart-one');
let heartTwo = $('#heart-two');
let heartThree = $('#heart-three');
let heartFour = $('#heart-four');

//Define hearts
let heart = {
  image: heartPng,
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
  image: bigHeartPng,
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

export { heart, bigHeart, heartOne, heartTwo, heartThree, heartFour };
