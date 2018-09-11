import { game } from '../../app.js';
import { newImage } from '../nonMathHelpers.js';
import { ctxExplosionCanvas, enemyMap } from '../maps.js';
import { xStarting, yStarting, } from '../mathHelpers.js';
import { xRightResetOffscreenEnemies, xLeftResetOffscreenEnemies, yResetOffscreenEnemies } from '../resetEnemyHelpers.js';

// wtfffffffff why do i need explosionPng and bossExplosionPng????????
let explosionPng = new Image();
explosionPng.src = 'images/explosion-death.png';

let bossExplosionPng = new Image();
bossExplosionPng.src = 'images/boss-explosion.png';

let explosion = newImage('images/explosion-death.png');
let bossExplosion = newImage('images/boss-explosion.png');

let enemyDies = baddy => {
  enemyMap.dispatchEvent(new CustomEvent('kill', {
    bubbles: true,
    detail: {
      enemy: baddy
    }
  }));
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


export { enemyDies };
