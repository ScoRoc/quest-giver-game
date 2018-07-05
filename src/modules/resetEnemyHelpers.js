
import { xStarting, yStarting } from './mathHelpers.js';
import { backgroundMap } from './maps.js';

let xRightResetOffscreenEnemies = function (enemy) {
  enemy.x = -enemy.spriteWidth * 1.25;
  enemy.y = yStarting(enemy.spriteHeight);
};

//rest xLeftRunner offscreen enemies
let xLeftResetOffscreenEnemies = function (enemy) {
  enemy.x = backgroundMap + enemy.spriteWidth;
  enemy.y = yStarting(enemy.spriteHeight);
};

//rest y offscreen enemies
let yResetOffscreenEnemies = function (enemy) {
  enemy.x = xStarting(enemy.spriteWidth);
  enemy.y = -enemy.spriteHeight * 1.25;
};

export { xRightResetOffscreenEnemies, xLeftResetOffscreenEnemies, yResetOffscreenEnemies };
