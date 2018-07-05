
import { xStarting, yStarting } from './mathHelpers.js';
import { newImage } from './nonMathHelpers.js';
import { backgroundMap } from './maps.js';
import { game, background, areEnemiesDead } from '../app.js';
import { ctxExplosionCanvas, enemyMap } from './maps.js';
import { heartOne, heartTwo, heartThree, heartFour } from './items/hearts.js';

//Define player
//Player, aka Link
let link = {
  image: newImage('images/link-spritesheet.png'),  //src image
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  upFrame: 0,  //placeholder for frame iteration
  downFrame: 0,  //placeholder for frame iteration
  leftFrame: 0,  //placeholder for frame iteration
  rightFrame: 0,  //placeholder for frame iteration
  pngWidth: 15,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 31.875,  //width of sprite on canvas
  spriteHeight: 34,  //height of sprite on canvas
  bottomBound: backgroundMap.height - 35,
  rightBound: backgroundMap.width - 33,
  x: xStarting(32),  //x point of link on canvas
  y: yStarting(35),  //y point of link on canvas
  speed: 10,  //number of px moved per interval
  frameSpeed: 14,  //number to calculate frame switch rate
  isMoving: false, //tracks to see if moving
  isMovingUp: false, //tracks to see if moving up
  isMovingDown: false, //tracks to see if moving down
  isMovingLeft: false, //tracks to see if moving left
  isMovingRight: false, //tracks to see if moving right
  isAttacking: false, //tracks to see if attacking
  attackTime: null,  //tracks time link attacked
  hitTime: null,  //tracks time link was hit
  heartTime: null,  //tracks time when link picked up heart
  life: 4,  //how much life left
  maxLife: 4,  //max life
  invincible: false,  //checks for invincibility
  moveUpAnimation: null,  //function for down movement
  moveDownAnimation: null,  //function for up movement
  moveLeftAnimation: null,  //function for left movement
  moveRightAnimation: null,  //function for right movement
  upMapMove: 0, //y px where link causes map to move up
  downMapMove: backgroundMap.height - 34, //y px where link causes map to move down
  leftMapMove: 0, //x px where link causes map to move left
  rightMapMove: backgroundMap.width - 32, //x px where link causes map to move right

  linkAttack: function() {
    link.attackTime = Date.now();
  },

  linkHit: function() {
    link.hitTime = Date.now();
  },

  grabHeart: function() {
    link.heartTime = Date.now();
  },

  //heart gif functionality
  heartGifArray: [heartOne, heartTwo, heartThree, heartFour],  //heart gif icons

  heartDisplay: function() {
    if (link.life === link.maxLife) {
      for (let i = 0; i < link.heartGifArray.length; i ++) {
        if (link.heartGifArray[i].hasClass('heart-hidden')) {
          link.heartGifArray[i].removeClass('damaged');
          link.heartGifArray[i].removeClass('heart-hidden');
          link.heartGifArray[i].addClass('heart-show');
        };
      };
    } else if (link.life === link.maxLife - 0.5) {
      heartOne.addClass('damaged');
    } else if (link.life === link.maxLife - 1) {
      heartOne.addClass('damaged');
      heartOne.addClass('heart-hidden');
    } else if (link.life === link.maxLife - 1.5) {
      heartOne.addClass('damaged');
      heartOne.addClass('heart-hidden');
      heartTwo.addClass('damaged');
    } else if (link.life === link.maxLife - 2) {
      heartOne.addClass('damaged');
      heartOne.addClass('heart-hidden');
      heartTwo.addClass('damaged');
      heartTwo.addClass('heart-hidden');
    } else if (link.life === link.maxLife - 2.5) {
      heartOne.addClass('damaged');
      heartOne.addClass('heart-hidden');
      heartTwo.addClass('damaged');
      heartTwo.addClass('heart-hidden');
      heartThree.addClass('damaged');
    } else if (link.life === link.maxLife - 3) {
      heartOne.addClass('damaged');
      heartOne.addClass('heart-hidden');
      heartTwo.addClass('damaged');
      heartTwo.addClass('heart-hidden');
      heartThree.addClass('damaged');
      heartThree.addClass('heart-hidden');
    } else if (link.life === link.maxLife - 3.5) {
      heartOne.addClass('damaged');
      heartOne.addClass('heart-hidden');
      heartTwo.addClass('damaged');
      heartTwo.addClass('heart-hidden');
      heartThree.addClass('damaged');
      heartThree.addClass('heart-hidden');
      heartFour.addClass('damaged');
    } else if (link.life <= 0) {
      heartOne.addClass('damaged');
      heartOne.addClass('heart-hidden');
      heartTwo.addClass('damaged');
      heartTwo.addClass('heart-hidden');
      heartThree.addClass('damaged');
      heartThree.addClass('heart-hidden');
      heartFour.addClass('damaged');
      heartFour.addClass('heart-hidden');
    }
  },

  moveUp: function() {
    if (link.y <= link.upMapMove && background.yFrame > 0 && areEnemiesDead()) {
      background.mapMoving = true;
      background.moveMapUp = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && link.y >= 0) {
      link.y -= link.speed;
      link.xFrame = 61;
      link.yFrame = 0;
      if (link.upFrame < (link.frameSpeed / 2)) {
        link.yFrame = 30;
        link.upFrame++;
      } else if(link.upFrame <= link.frameSpeed) {
        link.yFrame = 0;
        link.upFrame++;
      } else {
        link.upFrame = 0;
      };
    };
  },

  moveDown: function() {
    if (link.y >= link.downMapMove && background.yFrame < 1232 && areEnemiesDead()) {
      background.mapMoving = true;
      background.moveMapDown = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && link.y <= link.bottomBound) {
      link.y += link.speed;
      link.xFrame = 0;
      link.yFrame = 0;
      if (link.downFrame < (link.frameSpeed / 2)) {
        link.yFrame = 30;
        link.downFrame++;
      } else if(link.downFrame <= link.frameSpeed) {
        link.yFrame = 0;
        link.downFrame++;
      } else {
        link.downFrame = 0;
      };
    };
  },

  moveLeft: function() {
    if (link.x <= link.leftMapMove && background.xFrame > 0 && areEnemiesDead()) {
      background.mapMoving = true;
      background.moveMapLeft = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && link.x >= 0) {
      link.x -= link.speed;
      link.xFrame = 29;
      link.yFrame = 30;
      if (link.leftFrame < (link.frameSpeed * .5)) {
        link.yFrame = 0;
        link.leftFrame++;
      } else if(link.leftFrame <= link.frameSpeed) {
        link.yFrame = 30;
        link.leftFrame++;
      } else {
        link.leftFrame = 0;
      };
    };
  },

  moveRight: function() {
    if (link.x >= link.rightMapMove && background.xFrame < 3840 && areEnemiesDead()) {
      background.mapMoving = true;
      background.moveMapRight = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && link.x <= link.rightBound) {
      link.x += link.speed;
      link.xFrame = 90;
      link.yFrame = 0;
      if (link.rightFrame < (link.frameSpeed / 2)) {
        link.yFrame = 30;
        link.rightFrame++;
      } else if(link.rightFrame <= link.frameSpeed) {
        link.yFrame = 0;
        link.rightFrame++;
      } else {
        link.rightFrame = 0;
      };
    };
  },

  //Player keyboard actions
  playerAction: function(event) {
    //Up
    if (event.keyCode === 38 && !game.over) {
      if (!link.isMovingUp && !link.isMoving && !link.isAttacking && link.y >= 1) {
          link.isMovingUp = true;
          link.isMoving = true;
        };
    }
    //Down
    if (event.keyCode === 40 && !game.over) {
      if (!link.isMovingDown && !link.isMoving && !link.isAttacking && link.y <= link.bottomBound) {
          link.isMovingDown = true;
          link.isMoving = true;
        };
    }
    //Left
    if (event.keyCode === 37 && !game.over) {
      if (!link.isMovingLeft && !link.isMoving && !link.isAttacking && link.x >= 0) {
          link.isMovingLeft = true;
          link.isMoving = true;
        };
    }
    //Right
    if (event.keyCode === 39 && !game.over) {
      if (!link.isMovingRight && !link.isMoving && !link.isAttacking && link.x <= link.rightBound) {
          link.isMovingRight = true;
          link.isMoving = true;
        };
    }
    //Spacebar
    if (event.keyCode === 32 && !game.over) {
      switch(true) {
        //if facing up
        case link.xFrame === 61:
          link.xFrame = 60;
          link.pngHeight = 28;
          link.spriteHeight = 59.5;
          link.yFrame = 84;
          link.y -= 29;
          link.isMovingUp = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
          //if facing down
        case link.xFrame === 0:
          link.pngWidth = 16;
          link.pngHeight = 28;
          link.spriteHeight = 59.5;
          link.yFrame = 84;
          link.y += 3;
          link.isMovingDown = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
          //if facing left
        case link.xFrame === 29:
          link.xFrame = 24;
          link.pngWidth = 28;
          link.spriteWidth = 59.5;
          link.yFrame = 90;
          link.x -= 30;
          link.isMovingLeft = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
          //if facing right
        case link.xFrame === 90:
          link.xFrame = 84;
          link.pngWidth = 28;
          link.spriteWidth = 59.5;
          link.yFrame = 90;
          link.x += 6;
          link.isMovingRight = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
      };
    };
  },

  actionStop: function(event) {
    //Stop moving up
    if(event.keyCode === 38 && !game.over) {
      link.isMovingUp = false;
      link.isMoving = false;
      link.yFrame = 30;
    };
    //Stop moving down
    if(event.keyCode === 40 && !game.over) {
      link.isMovingDown = false;
      link.isMoving = false;
      link.yFrame = 0;
    };
    //Stop moving left
    if(event.keyCode === 37 && !game.over) {
      link.isMovingLeft = false;
      link.isMoving = false;
      link.yFrame = 0;
    };
    //Stop moving right
    if(event.keyCode === 39 && !game.over) {
      link.isMovingRight = false;
      link.isMoving = false;
      link.yFrame = 31;
    };
    //Stop attacking
    if (event.keyCode === 32 && !game.over) {
      switch(true) {
        //if facing up
        case link.xFrame === 60:
          link.xFrame = 61;
          link.pngHeight = 16;
          link.spriteHeight = 34;
          link.yFrame = 30;
          link.y += 29;
          link.isAttacking = false;
          break;
          //if facing down
        case link.xFrame === 0:
          link.pngWidth = 15;
          link.pngHeight = 16;
          link.spriteHeight = 34;
          link.yFrame = 0;
          link.y -= 3;
          link.isAttacking = false;
          break;
          //if facing left
        case link.xFrame === 24:
          link.xFrame = 29;
          link.pngWidth = 15;
          link.spriteWidth = 31.875;
          link.yFrame = 0;
          link.x += 30;
          link.isAttacking = false;
          break;
          link.yFrame = 100;
          //if facing right
        case link.xFrame === 84:
          link.xFrame = 90;
          link.pngWidth = 15;
          link.spriteWidth = 31.875;
          link.yFrame = 31;
          link.x -= 6;
          link.isAttacking = false;
          break;
      };
    };
  }

};

export default link;
