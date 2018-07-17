
import link from '../player.js';
import { heart, bigHeart } from '../items/hearts.js';
import { xStarting, yStarting } from '../mathHelpers.js';
import { game } from '../../app.js';

//Collision detection between Link and objects
let heartCollisionDetection = function(object1, object2) {
  let x1 = object1.x;
  let y1 = object1.y;
  let x2 = object2.x;
  let y2 = object2.y;
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  let heartOne = $('#heart-one');
  let heartTwo = $('#heart-two');
  let heartThree = $('#heart-three');
  let heartFour = $('#heart-four');
  let crashZone = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  if (crashZone <= 30 && link.life <= 3.5 && object2.show === true) {
    object2.show = false;
    if (object2 === bigHeart) {
      object2.x = xStarting(object2.spriteWidth);
      object2.y = yStarting(object2.spriteHeight);
      if (link.life <= 3.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life = link.maxLife;
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
      } else if (link.life === 3.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life = link.maxLife;
        heartFour.removeClass('damaged');
      };
    } else if (object2 === heart) {
      object2.x = xStarting(object2.spriteWidth);
      object2.y = yStarting(object2.spriteHeight);
      if (link.life === 0.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        heartFour.removeClass('damaged');
        heartThree.removeClass('heart-hidden');
        heartThree.addClass('heart-show');
      } else if (link.life === 1 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        heartThree.removeClass('heart-hidden');
        heartThree.removeClass('damaged');
        heartThree.addClass('heart-show');
      } else if (link.life === 1.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        heartThree.removeClass('damaged');
        heartTwo.removeClass('heart-hidden');
        heartTwo.addClass('heart-show');
      } else if (link.life === 2 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        heartTwo.removeClass('heart-hidden');
        heartTwo.removeClass('damaged');
        heartTwo.addClass('heart-show');
      } else if (link.life === 2.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        heartTwo.removeClass('damaged');
        heartOne.removeClass('heart-hidden');
        heartOne.addClass('heart-show');
      } else if (link.life === 3 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        heartOne.removeClass('heart-hidden');
        heartOne.removeClass('damaged');
        heartOne.addClass('heart-show');
      } else if (link.life === 3.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 0.5;
        heartOne.removeClass('damaged');
      };
    };
  };
};

export default heartCollisionDetection;
