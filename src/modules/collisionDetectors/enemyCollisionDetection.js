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
let enemyCollisionDetection = function(player, baddy) {
  let x1 = player.x;
  let y1 = player.y;
  let x2 = baddy.x;
  let y2 = baddy.y;
  if (!player.isAttacking && ((game.now - player.hitTime) / 1000) > 1.25 && baddy.currentLife > 0) {
    let xDistance = x2 - x1;
    let yDistance = y2 - (y1 - 4);
    let hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    if (hitRadius <= 33 && !player.invincible) {
      player.getDamagedTime();
      player.life -= baddy.strength;
      updateHeartDisplay(player);
    };
  } else if (player.isAttacking && ((game.now - player.attackTime) / 1000) > .2 && baddy.currentLife > 0) {
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
    player.lastAttacked = baddy;
    console.log('heres last attacked: ', player.lastAttacked);
    if (hitRadius <= 32 || hitRadiusRight <= 32 || hitRadiusDown <= 32) {
      player.getAttackTime();
      baddy.currentLife -= 1;
      if (baddy.currentLife === 0) {
        baddy.dead = true;
        enemyMap.dispatchEvent(new CustomEvent('kill', {
          bubbles: true,
          detail: {
            enemy: baddy
          }
        }));
      };
      if (baddy.dead) {
        if (baddy.type !== 'boss') {
          ctxExplosionCanvas.drawImage(explosion, 40, 10, 280, 285, baddy.x, baddy.y, 60, 60);
        } else if (baddy.type === 'boss') {
          ctxExplosionCanvas.drawImage(bossExplosion, 0, 0, 958, 952, baddy.x, baddy.y, 80, 80);
        };
        if (baddy.type !== 'xRightRunner' && baddy.type !== 'xLeftRunner' && baddy.type !== 'yRunner') {
          baddy.x = xStarting(baddy.spriteWidth);
          baddy.y = yStarting(baddy.spriteHeight);
        } else if (baddy.type === 'xRightRunner') {
          xRightResetOffscreenEnemies(baddy);
        } else if (baddy.type === 'xLeftRunner') {
          xLeftResetOffscreenEnemies(baddy);
        } else if (baddy.type === 'yRunner') {
          yResetOffscreenEnemies(baddy);
        };
        game.score += baddy.points;
      };
    };
  };
};

export default enemyCollisionDetection;
