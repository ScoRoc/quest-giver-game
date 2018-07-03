
import link from '../player.js';
import { game, explosionPng, bossExplosionPng } from '../../old-app.js';
import { ctxExplosionCanvas } from '../maps.js';
import moblin from '../enemies/moblin.js';
import { xStarting, yStarting, } from '../mathHelpers.js';
import { xRightResetOffscreenEnemies, xLeftResetOffscreenEnemies, yResetOffscreenEnemies } from '../resetEnemyHelpers.js';

//Collision Detection between Link and enemies
let enemyCollisionDetection = function(x1, y1, x2, y2, enemy) {
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
    if (hitRadius <= 32 || hitRadiusRight <= 32 || hitRadiusDown <= 32) {
      link.linkAttack();
      enemy.life -= 1;
      if (enemy.life === 0) {
        enemy.dead = true;
      };
      if (enemy.dead) {
        if (enemy.type !== 'boss') {
          ctxExplosionCanvas.drawImage(explosionPng, 40, 10, 280, 285, enemy.xMove, enemy.yMove, 60, 60);
        } else if (enemy.type === 'boss') {
          ctxExplosionCanvas.drawImage(bossExplosionPng, 0, 0, 958, 952, moblin.xMove, moblin.yMove, 80, 80);
        };
        if (enemy.type !== 'xRightRunner' && enemy.type !== 'xLeftRunner' && enemy.type !== 'yRunner') {
          enemy.xMove = xStarting(enemy.spriteWidth);
          enemy.yMove = yStarting(enemy.spriteHeight);
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