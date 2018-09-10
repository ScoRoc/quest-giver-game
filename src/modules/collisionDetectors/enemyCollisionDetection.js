import player1 from '../Player.js';
import { updateHeartDisplay } from '../items/hearts.js';
import { game } from '../../app.js';
import { ctxExplosionCanvas, enemyMap } from '../maps.js';
import { xStarting, yStarting, } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';
import { xRightResetOffscreenEnemies, xLeftResetOffscreenEnemies, yResetOffscreenEnemies } from '../resetEnemyHelpers.js';

// wtfffffffff why do i need explosionPng and bossExplosionPng????????
let explosionPng = new Image();
explosionPng.src = 'images/explosion-death.png';

let bossExplosionPng = new Image();
bossExplosionPng.src = 'images/boss-explosion.png';

//Collision Detection between Player and enemies
let enemyCollisionDetection = function(object1, object2) {
  let x1 = object1.x;
  let y1 = object1.y;
  let x2 = object2.x;
  let y2 = object2.y;
  if (!player1.isAttacking && ((game.now - player1.hitTime) / 1000) > 1.25 && object2.life > 0) {
    let xDistance = x2 - x1;
    let yDistance = y2 - (y1 - 4);
    let hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    if (hitRadius <= 33 && !player1.invincible) {
      player1.getDamagedTime();
      player1.life -= object2.strength;
      updateHeartDisplay(player1);
    };
  } else if (player1.isAttacking && ((game.now - player1.attackTime) / 1000) > .2 && object2.life > 0) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    let hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    let xRightAttack = x1 + 20;
    let xDistanceRight = x2 - xRightAttack;
    let hitRadiusRight = Math.abs(Math.sqrt(Math.pow(xDistanceRight, 2) + Math.pow(yDistance, 2)));
    let yDownAttack = y1 + 18;
    let yDistanceDown = y2 - yDownAttack;
    let hitRadiusDown = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistanceDown, 2)));
    let explosion = newImage('images/explosion-death.png');
    let bossExplosion = newImage('images/boss-explosion.png');
    if (hitRadius <= 32 || hitRadiusRight <= 32 || hitRadiusDown <= 32) {
      player1.getAttackTime();
      object2.life -= 1;
      if (object2.life === 0) {
        object2.dead = true;
        enemyMap.dispatchEvent(new CustomEvent('kill', {
          bubbles: true,
          detail: {
            enemy: object2
          }
        }));
      };
      if (object2.dead) {
        if (object2.type !== 'boss') {
          ctxExplosionCanvas.drawImage(explosion, 40, 10, 280, 285, object2.x, object2.y, 60, 60);
        } else if (object2.type === 'boss') {
          ctxExplosionCanvas.drawImage(bossExplosion, 0, 0, 958, 952, object2.x, object2.y, 80, 80);
        };
        if (object2.type !== 'xRightRunner' && object2.type !== 'xLeftRunner' && object2.type !== 'yRunner') {
          object2.x = xStarting(object2.spriteWidth);
          object2.y = yStarting(object2.spriteHeight);
        } else if (object2.type === 'xRightRunner') {
          xRightResetOffscreenEnemies(object2);
        } else if (object2.type === 'xLeftRunner') {
          xLeftResetOffscreenEnemies(object2);
        } else if (object2.type === 'yRunner') {
          yResetOffscreenEnemies(object2);
        };
        game.score += object2.points;
      };
    };
  };
};

export default enemyCollisionDetection;
