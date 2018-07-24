
import link from '../player.js';
import { game } from '../../app.js';
import { ctxExplosionCanvas } from '../maps.js';
import { xStarting, yStarting, } from '../mathHelpers.js';
import { newImage } from '../nonMathHelpers.js';
import { xRightResetOffscreenEnemies, xLeftResetOffscreenEnemies, yResetOffscreenEnemies } from '../resetEnemyHelpers.js';

// wtfffffffff why do i need explosionPng and bossExplosionPng????????
let explosionPng = new Image();
explosionPng.src = 'images/explosion-death.png';

let bossExplosionPng = new Image();
bossExplosionPng.src = 'images/boss-explosion.png';

//Collision Detection between Link and enemies
let enemyCollisionDetection = function(x1, y1, x2, y2, enemy) {
  // refactor to onlyl use object1 and object 2 - like heartCollisionDetection
  if (!link.isAttacking && ((game.now - link.hitTime) / 1000) > 1.25 && enemy.life > 0) {
    let xDistance = x2 - x1;
    let yDistance = y2 - (y1 - 4);
    let hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    if (hitRadius <= 33 && !link.invincible) {
      link.linkHit();
      link.life -= enemy.strength;
      link.heartDisplay();
    };
  } else if (link.isAttacking && ((game.now - link.attackTime) / 1000) > .2 && enemy.life > 0) {
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
      link.linkAttack();
      enemy.life -= 1;
      if (enemy.life === 0) {
        enemy.dead = true;
      };
      if (enemy.dead) {
        if (enemy.type !== 'boss') {
          ctxExplosionCanvas.drawImage(explosion, 40, 10, 280, 285, enemy.x, enemy.y, 60, 60);
        } else if (enemy.type === 'boss') {
          ctxExplosionCanvas.drawImage(bossExplosion, 0, 0, 958, 952, enemy.x, enemy.y, 80, 80);
        };
        if (enemy.type !== 'xRightRunner' && enemy.type !== 'xLeftRunner' && enemy.type !== 'yRunner') {
          enemy.x = xStarting(enemy.spriteWidth);
          enemy.y = yStarting(enemy.spriteHeight);
        } else if (enemy.type === 'xRightRunner') {
          xRightResetOffscreenEnemies(enemy);
        } else if (enemy.type === 'xLeftRunner') {
          xLeftResetOffscreenEnemies(enemy);
        } else if (enemy.type === 'yRunner') {
          yResetOffscreenEnemies(enemy);
        };
        game.score += enemy.points;
      };
    };
  };
};

export default enemyCollisionDetection;
