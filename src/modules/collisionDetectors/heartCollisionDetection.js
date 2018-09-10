import { heart, bigHeart } from '../items/hearts.js';
import { xStarting, yStarting } from '../mathHelpers.js';
import { game } from '../../app.js';

//Collision detection between Player and objects
let heartCollisionDetection = function(player, heart) {
  let x1 = player.x;
  let y1 = player.y;
  let x2 = heart.x;
  let y2 = heart.y;
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  let heartOne = $('#heart-one');
  let heartTwo = $('#heart-two');
  let heartThree = $('#heart-three');
  let heartFour = $('#heart-four');
  let crashZone = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  if (crashZone <= 30 && player.life <= 3.5 && heart.show === true) {
    heart.show = false;
    if (heart === bigHeart) {
      heart.x = xStarting(heart.spriteWidth);
      heart.y = yStarting(heart.spriteHeight);
      if (player.life <= 3.5 && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life = player.maxLife;
        heartOne.removeClass('damaged');
        heartOne.removeClass('heart-hidden');
        heartOne.addClass('heart-show');
        heartTwo.removeClass('damaged');
        heartTwo.removeClass('heart-hidden');
        heartTwo.addClass('heart-show');
        heartThree.removeClass('damaged');
        heartThree.removeClass('heart-hidden');
        heartThree.addClass('heart-show');
        heartFour.removeClass('damaged');
      } else if (player.life === 3.5 && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life = player.maxLife;
        heartFour.removeClass('damaged');
      };
    } else if (heart === heart) {
      heart.x = xStarting(heart.spriteWidth);
      heart.y = yStarting(heart.spriteHeight);
      if (player.life === 0.5 && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life += 1;
        heartFour.removeClass('damaged');
        heartThree.removeClass('heart-hidden');
        heartThree.addClass('heart-show');
      } else if (player.life === 1 && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life += 1;
        heartThree.removeClass('heart-hidden');
        heartThree.removeClass('damaged');
        heartThree.addClass('heart-show');
      } else if (player.life === 1.5 && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life += 1;
        heartThree.removeClass('damaged');
        heartTwo.removeClass('heart-hidden');
        heartTwo.addClass('heart-show');
      } else if (player.life === 2 && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life += 1;
        heartTwo.removeClass('heart-hidden');
        heartTwo.removeClass('damaged');
        heartTwo.addClass('heart-show');
      } else if (player.life === 2.5 && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life += 1;
        heartTwo.removeClass('damaged');
        heartOne.removeClass('heart-hidden');
        heartOne.addClass('heart-show');
      } else if (player.life === 3 && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life += 1;
        heartOne.removeClass('heart-hidden');
        heartOne.removeClass('damaged');
        heartOne.addClass('heart-show');
      } else if (player.life === 3.5 && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life += 0.5;
        heartOne.removeClass('damaged');
      };
    };
  };
};

export default heartCollisionDetection;
