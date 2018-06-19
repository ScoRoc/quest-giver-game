
import { xStarting, yStarting } from './mathHelpers.js';

let xRightResetOffscreenEnemies = function (enemy) {
  enemy.xMove = -100;
  enemy.yMove = yStarting(enemy.spriteHeight);
};

//rest xLeftRunner offscreen enemies
let xLeftResetOffscreenEnemies = function (enemy) {
  enemy.xMove = 555;
  enemy.yMove = yStarting(enemy.spriteHeight);
};

//rest y offscreen enemies
let yResetOffscreenEnemies = function (enemy) {
  enemy.xMove = xStarting(enemy.spriteWidth);
  enemy.yMove = -60;
};

export { xRightResetOffscreenEnemies, xLeftResetOffscreenEnemies, yResetOffscreenEnemies };
